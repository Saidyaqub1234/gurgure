<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrintOption;
use App\Models\PrintOptionGroup;
use App\Models\PrintPriceRule;
use App\Models\PrintProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminPrintProductController extends Controller
{
    public function index()
    {
        $products = PrintProduct::with(['optionGroups' => fn ($q) => $q->orderBy('order'), 'priceRules'])
            ->orderBy('order')->orderBy('id')->get();

        return response()->json(['data' => $products, 'success' => true]);
    }

    public function show(PrintProduct $printProduct)
    {
        $printProduct->load(['optionGroups.options', 'priceRules']);
        return response()->json(['data' => $printProduct, 'success' => true]);
    }

    public function store(Request $request)
    {
        $data = $this->validateBase($request);
        $product = PrintProduct::create($data);
        $this->saveNested($product, $request);

        return response()->json([
            'data' => $product->load(['optionGroups.options', 'priceRules']),
            'message' => 'Product created successfully.',
            'success' => true,
        ], 201);
    }

    public function update(Request $request, PrintProduct $printProduct)
    {
        $data = $this->validateBase($request, $printProduct);
        $printProduct->update($data);
        $this->saveNested($printProduct, $request);

        return response()->json([
            'data' => $printProduct->load(['optionGroups.options', 'priceRules']),
            'message' => 'Product updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(PrintProduct $printProduct)
    {
        $printProduct->delete();

        return response()->json([
            'message' => 'Product deleted successfully.',
            'success' => true,
        ]);
    }

    protected function validateBase(Request $request, ?PrintProduct $product = null): array
    {
        $unique = $product ? 'unique:print_products,slug,' . $product->id : 'unique:print_products,slug';
        $data = $request->validate([
            'slug' => 'required|string|max:255|' . $unique,
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:120',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:500',
            'price_mode' => 'required|in:instant,estimated,quote',
            'base_price' => 'nullable|numeric|min:0',
            'setup_cost' => 'nullable|numeric|min:0',
            'min_quantity' => 'nullable|integer|min:1',
            'unit_label' => 'nullable|string|max:50',
            'turnaround' => 'nullable|string|max:120',
            'is_published' => 'boolean',
            'order' => 'nullable|integer',
            'translations' => 'nullable|array',
        ]);

        $data['slug'] = Str::slug($data['slug']);
        $data['base_price'] = $data['base_price'] ?? null;
        $data['setup_cost'] = $data['setup_cost'] ?? 0;
        $data['min_quantity'] = $data['min_quantity'] ?? 1;
        $data['order'] = $data['order'] ?? 0;
        return $data;
    }

    protected function saveNested(PrintProduct $product, Request $request): void
    {
        // Price rules: replace wholesale.
        if ($request->has('price_rules')) {
            $product->priceRules()->delete();
            foreach (($request->input('price_rules') ?: []) as $rule) {
                if (!isset($rule['min_qty']) || !isset($rule['unit_price'])) continue;
                $product->priceRules()->create([
                    'min_qty' => (int) ($rule['min_qty'] ?? 1),
                    'max_qty' => ($rule['max_qty'] ?? null) !== null ? (int) $rule['max_qty'] : null,
                    'unit_price' => (float) $rule['unit_price'],
                ]);
            }
        }

        if (!$request->has('option_groups')) {
            return;
        }

        $submittedGroups = $request->input('option_groups') ?: [];
        $submittedGroupIds = [];
        $order = 0;

        foreach ($submittedGroups as $groupData) {
            $order++;
            $group = isset($groupData['id']) && $groupData['id']
                ? PrintOptionGroup::where('product_id', $product->id)->find($groupData['id'])
                : null;
            if (!$group) {
                $group = new PrintOptionGroup(['product_id' => $product->id]);
            }
            $group->name = $groupData['name'] ?? 'Group';
            $group->type = in_array($groupData['type'] ?? 'radio', ['radio', 'select', 'checkbox']) ? $groupData['type'] : 'radio';
            $group->required = isset($groupData['required']) ? (bool) $groupData['required'] : false;
            $group->order = $order;
            $group->translations = $groupData['translations'] ?? null;
            $group->save();
            $submittedGroupIds[] = $group->id;

            $submittedOptionIds = [];
            $optOrder = 0;
            foreach (($groupData['options'] ?? []) as $optData) {
                $optOrder++;
                $option = isset($optData['id']) && $optData['id']
                    ? PrintOption::where('group_id', $group->id)->find($optData['id'])
                    : null;
                if (!$option) {
                    $option = new PrintOption(['group_id' => $group->id]);
                }
                $option->name = $optData['name'] ?? 'Option';
                $option->description = $optData['description'] ?? null;
                $option->price = (float) ($optData['price'] ?? 0);
                $option->price_type = in_array($optData['price_type'] ?? 'none', ['none', 'per_unit', 'one_time']) ? $optData['price_type'] : 'none';
                $option->is_default = isset($optData['is_default']) ? (bool) $optData['is_default'] : false;
                $option->order = $optOrder;
                $option->translations = $optData['translations'] ?? null;
                $option->save();
                $submittedOptionIds[] = $option->id;
            }
            // Remove options not in payload.
            $group->options()->whereNotIn('id', $submittedOptionIds)->delete();
        }
        // Remove groups not in payload.
        $product->optionGroups()->whereNotIn('id', $submittedGroupIds)->delete();
    }
}