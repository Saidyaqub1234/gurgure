<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Quotation;
use App\Models\QuotationItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminQuotationController extends Controller
{
    public function index(Request $request)
    {
        $query = Quotation::with(['customer', 'items']);

        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $quotations = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'data' => $quotations,
            'success' => true,
        ]);
    }

    public function show(Quotation $quotation)
    {
        return response()->json([
            'data' => $quotation->load(['customer', 'items']),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
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
            'valid_until' => 'nullable|date',
            'notes' => 'nullable|string',
            'status' => 'nullable|string|in:draft,sent,accepted,rejected,converted_to_invoice',
        ]);

        DB::beginTransaction();

        try {
            $customer = Customer::findOrFail($validated['customer_id']);

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
                'status' => $validated['status'] ?? 'draft',
                'valid_until' => $validated['valid_until'] ?? now()->addDays(30),
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
                'message' => 'Quotation created successfully.',
                'success' => true,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create quotation.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function update(Request $request, Quotation $quotation)
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
            'valid_until' => 'nullable|date',
            'notes' => 'nullable|string',
            'status' => 'nullable|string|in:draft,sent,accepted,rejected,converted_to_invoice',
        ]);

        DB::beginTransaction();

        try {
            $customer = Customer::firstOrCreate(
                ['email' => $validated['customer']['email']],
                [
                    'name' => $validated['customer']['name'],
                    'organization_name' => $validated['customer']['organization_name'] ?? null,
                    'phone' => $validated['customer']['phone'] ?? null,
                    'address' => $validated['customer']['address'] ?? null,
                ]
            );

            $subtotal = collect($validated['items'])->sum('total_price');
            $discount = $validated['discount'] ?? 0;
            $tax = $validated['tax'] ?? 0;
            $total = $subtotal - $discount + $tax;

            $quotation->update([
                'customer_id' => $customer->id,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'tax' => $tax,
                'total' => $total,
                'valid_until' => $validated['valid_until'] ?? $quotation->valid_until,
                'notes' => $validated['notes'] ?? $quotation->notes,
                'status' => $validated['status'] ?? $quotation->status,
            ]);

            $quotation->items()->delete();

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
                'message' => 'Quotation updated successfully.',
                'success' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to update quotation.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function destroy(Quotation $quotation)
    {
        $quotation->items()->delete();
        $quotation->delete();

        return response()->json([
            'message' => 'Quotation deleted successfully.',
            'success' => true,
        ]);
    }

    public function send(Quotation $quotation)
    {
        $quotation->update(['status' => 'sent']);

        return response()->json([
            'data' => $quotation,
            'message' => 'Quotation marked as sent.',
            'success' => true,
        ]);
    }

    public function accept(Quotation $quotation)
    {
        if ($quotation->status === 'converted_to_invoice') {
            return response()->json([
                'message' => 'Quotation has already been converted to invoice.',
                'success' => false,
            ], 400);
        }

        DB::beginTransaction();

        try {
            $invoice = Invoice::create([
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

    public function reject(Quotation $quotation)
    {
        $quotation->update(['status' => 'rejected']);

        return response()->json([
            'data' => $quotation,
            'message' => 'Quotation marked as rejected.',
            'success' => true,
        ]);
    }
}
