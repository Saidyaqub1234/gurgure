<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Package;
use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PublicQuotationController extends Controller
{
    protected function lang(Request $request): string
    {
        $lang = $request->header('X-Language', 'en');
        return in_array($lang, ['fa', 'ps']) ? $lang : 'en';
    }

    public function getServicesWithPackages(Request $request)
    {
        $services = Service::where('is_published', true)
            ->whereHas('packages', function ($query) {
                $query->where('is_active', true);
            })
            ->with(['packages' => function ($query) {
                $query->where('is_active', true)->with(['items' => function ($itemQuery) {
                    $itemQuery->where('is_active', true);
                }]);
            }])
            ->orderBy('order')
            ->get();

        $data = $services->map(function ($service) {
            $arr = $service->localize(request()->header('X-Language', 'en') ?: 'en');
            $arr['packages'] = $service->packages->map(function ($package) {
                $p = $package->localize(in_array(request()->header('X-Language'), ['fa','ps']) ? request()->header('X-Language') : 'en');
                $p['items'] = $package->items->map(function ($item) {
                    return $item->localize(in_array(request()->header('X-Language'), ['fa','ps']) ? request()->header('X-Language') : 'en');
                })->values()->all();
                return $p;
            })->values()->all();
            return $arr;
        })->values()->all();

        return response()->json([
            'data' => $data,
            'success' => true,
        ]);
    }

    public function getPackageWithItems($id, Request $request)
    {
        $lang = $this->lang($request);
        $package = Package::where('id', $id)
            ->where('is_active', true)
            ->with(['items' => function ($query) {
                $query->where('is_active', true);
            }, 'service'])
            ->firstOrFail();

        $data = $package->localize($lang);
        $data['items'] = $package->items->map(fn ($item) => $item->localize($lang))->values()->all();
        if ($package->service) {
            $data['service'] = $package->service->localize($lang);
        }

        return response()->json([
            'data' => $data,
            'success' => true,
        ]);
    }

    public function submitQuotation(Request $request)
    {
        $validated = $request->validate([
            'customer.name' => 'required|string|max:255',
            'customer.organization_name' => 'nullable|string|max:255',
            'customer.email' => 'required|email|max:255',
            'customer.phone' => 'nullable|string|max:255',
            'customer.address' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.service_id' => 'nullable|exists:services,id',
            'items.*.package_id' => 'nullable|exists:packages,id',
            'items.*.package_item_id' => 'nullable|exists:package_items,id',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            // Use authenticated customer if available, otherwise lookup by email
            $customer = null;
            if ($request->user() && $request->user() instanceof \App\Models\Customer) {
                $customer = $request->user();
            } else {
                $customer = Customer::where('email', $validated['customer']['email'])->firstOrFail();
            }

            $subtotal = collect($validated['items'])->sum('total_price');
            $discount = $validated['discount'] ?? 0;
            $tax = $validated['tax'] ?? 0;
            $total = $subtotal - $discount + $tax;

            $quotation = Quotation::create([
                'customer_id' => $customer->id,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'tax' => $tax,
                'total' => $total,
                'status' => 'draft',
                'valid_until' => now()->addDays(30),
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($validated['items'] as $item) {
                QuotationItem::create([
                    'quotation_id' => $quotation->id,
                    'service_id' => $item['service_id'] ?? null,
                    'package_id' => $item['package_id'] ?? null,
                    'package_item_id' => $item['package_item_id'] ?? null,
                    'item_name' => $item['item_name'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['total_price'],
                ]);
            }

            DB::commit();

            return response()->json([
                'data' => $quotation->load(['customer', 'items']),
                'message' => 'Quotation submitted successfully.',
                'success' => true,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to submit quotation.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function viewQuotation($quotationNo)
    {
        $quotation = Quotation::where('quotation_no', $quotationNo)
            ->with(['customer', 'items'])
            ->firstOrFail();

        return response()->json([
            'data' => $quotation,
            'success' => true,
        ]);
    }

    public function acceptQuotation($quotationNo)
    {
        $quotation = Quotation::where('quotation_no', $quotationNo)
            ->with(['customer', 'items'])
            ->firstOrFail();

        if ($quotation->status === 'converted_to_invoice') {
            return response()->json([
                'message' => 'Quotation has already been accepted.',
                'success' => false,
            ], 400);
        }

        if ($quotation->status === 'rejected') {
            return response()->json([
                'message' => 'This quotation has been rejected.',
                'success' => false,
            ], 400);
        }

        DB::beginTransaction();

        try {
            $invoice = \App\Models\Invoice::create([
                'quotation_id' => $quotation->id,
                'customer_id' => $quotation->customer_id,
                'subtotal' => $quotation->subtotal,
                'discount' => $quotation->discount,
                'tax' => $quotation->tax,
                'total' => $quotation->total,
                'paid_amount' => 0,
                'balance' => $quotation->total,
                'status' => 'pending',
                'due_date' => $quotation->valid_until,
            ]);

            $quotation->update(['status' => 'converted_to_invoice']);

            DB::commit();

            return response()->json([
                'data' => $invoice->load(['customer', 'quotation.items']),
                'message' => 'Quotation accepted and invoice generated.',
                'success' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to accept quotation.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }
}
