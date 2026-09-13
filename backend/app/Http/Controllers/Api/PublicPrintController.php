<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\PrintOrder;
use App\Models\PrintProduct;
use App\Services\PrintPricingService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PublicPrintController extends Controller
{
    protected function lang(Request $request): string
    {
        $lang = $request->header('X-Language', 'en');
        return in_array($lang, ['en', 'fa', 'ps']) ? $lang : 'en';
    }

    public function index(Request $request)
    {
        $lang = $this->lang($request);
        $products = PrintProduct::where('is_published', true)->orderBy('order')->orderBy('name')->get();

        $data = $products->map(function ($p) use ($lang) {
            $tr = is_array($p->translations) ? $p->translations : [];
            $name = $p->name;
            $short = $p->short_description;
            $category = $p->category;
            if (in_array($lang, ['fa', 'ps'])) {
                if (($tr[$lang]['name'] ?? null) !== null && $tr[$lang]['name'] !== '') $name = $tr[$lang]['name'];
                if (($tr[$lang]['short_description'] ?? null) !== null && $tr[$lang]['short_description'] !== '') $short = $tr[$lang]['short_description'];
                if (($tr[$lang]['category'] ?? null) !== null && $tr[$lang]['category'] !== '') $category = $tr[$lang]['category'];
            }
            return [
                'id' => $p->id,
                'slug' => $p->slug,
                'name' => $name,
                'category' => $category,
                'short_description' => $short,
                'image' => $p->image,
                'price_mode' => $p->price_mode,
                'unit_label' => $p->unit_label,
                'turnaround' => $p->turnaround,
                'min_quantity' => $p->min_quantity,
                'starting_price' => $this->startingPrice($p),
            ];
        })->values();

        $categories = $data->groupBy('category')->map(fn ($items, $key) => [
            'name' => $key,
            'count' => $items->count(),
        ])->values();

        return response()->json(['data' => $data, 'categories' => $categories, 'success' => true]);
    }

    public function show(Request $request, string $slug)
    {
        $lang = $this->lang($request);
        $product = PrintProduct::where('slug', $slug)->where('is_published', true)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found.', 'success' => false], 404);
        }
        return response()->json(['data' => $product->toPublicArray($lang), 'success' => true]);
    }

    public function price(Request $request, string $slug)
    {
        $request->validate([
            'qty' => 'required|integer|min:1',
            'selections' => 'nullable|array',
        ]);

        $validated = $request->validate([
            'selections.*' => 'array',
            'selections.*.*' => 'integer',
        ]);

        $product = PrintProduct::where('slug', $slug)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found.', 'success' => false], 404);
        }

        $service = new PrintPricingService();
        $result = $service->calculate($product, (int) $request->qty, $request->input('selections', []));

        return response()->json(['data' => $result, 'success' => true]);
    }

    public function storeOrder(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.slug' => 'required|string',
            'items.*.qty' => 'required|integer|min:1',
            'items.*.selections' => 'nullable|array',
        ]);

        $service = new PrintPricingService();
        $snapshot = [];
        $grandTotal = 0.0;
        $subtotal = 0.0;

        foreach ($request->items as $item) {
            $product = PrintProduct::where('slug', $item['slug'])->where('is_published', true)->first();
            if (!$product) {
                throw ValidationException::withMessages(['items' => "Product {$item['slug']} not found."]);
            }
            $price = $service->calculate($product, (int) $item['qty'], $item['selections'] ?? []);
            $tr = is_array($product->translations) ? $product->translations : [];
            $thisLang = $this->lang($request);
            $name = $product->name;
            if (in_array($thisLang, ['fa', 'ps']) && ($tr[$thisLang]['name'] ?? null) !== null && $tr[$thisLang]['name'] !== '') {
                $name = $tr[$thisLang]['name'];
            }
            $grandTotal += $price['total'];
            $subtotal += $price['total'];
            $snapshot[] = [
                'product_id' => $product->id,
                'slug' => $product->slug,
                'name' => $name,
                'qty' => $price['qty'],
                'mode' => $price['mode'],
                'options' => $price['options'],
                'unit_price' => $price['unit_price'],
                'effective_per_unit' => $price['effective_per_unit'],
                'line_items' => $price['line_items'],
                'total' => $price['total'],
                'estimate_low' => $price['estimate_low'],
                'estimate_high' => $price['estimate_high'],
            ];
        }

        $customer = null;
        if ($request->user()) {
            $customer = $request->user();
        } elseif ($request->filled('email')) {
            $customer = Customer::where('email', $request->email)->first();
        }

        $nextId = (PrintOrder::max('id') ?? 0) + 1;
        $order = new PrintOrder([
            'order_no' => 'GR-' . date('ymd') . '-' . str_pad((string) $nextId, 4, '0', STR_PAD_LEFT),
            'customer_id' => $customer ? $customer->id : null,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'items' => $snapshot,
            'subtotal' => $subtotal,
            'total' => $grandTotal,
            'status' => 'pending',
            'notes' => $request->notes,
        ]);
        $order->save();

        return response()->json([
            'data' => $order,
            'message' => 'Order submitted successfully.',
            'success' => true,
        ], 201);
    }

    protected function startingPrice(PrintProduct $product): ?float
    {
        $rules = $product->priceRules()->orderBy('min_qty')->limit(1)->get();
        if ($rules->isNotEmpty()) {
            return (float) $rules->first()->unit_price;
        }
        return $product->base_price !== null ? (float) $product->base_price : null;
    }
}