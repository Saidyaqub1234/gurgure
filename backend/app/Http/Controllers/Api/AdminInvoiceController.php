<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Payment;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminInvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Invoice::with(['customer', 'payments']);

        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $invoices = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'data' => $invoices,
            'success' => true,
        ]);
    }

    public function show(Invoice $invoice)
    {
        return response()->json([
            'data' => $invoice->load(['customer', 'payments.receipt', 'quotation.items', 'items.service', 'items.package']),
            'success' => true,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'customer_name' => 'required_without:customer_id|nullable|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'customer_phone' => 'nullable|string|max:255',
            'customer_organization_name' => 'nullable|string|max:255',
            'quotation_id' => 'nullable|exists:quotations,id',
            'subtotal' => 'required_without:items|nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total' => 'required_without:items|nullable|numeric|min:0',
            'due_date' => 'nullable|date',
            'status' => 'nullable|string|in:pending,partial_paid,paid,overdue,cancelled',
            'items' => 'sometimes|array|min:1',
            'items.*.service_id' => 'nullable|exists:services,id',
            'items.*.package_id' => 'nullable|exists:packages,id',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
        ]);

        if ($validated['customer_id'] ?? null) {
            $customerId = $validated['customer_id'];
        } else {
            $customer = Customer::create([
                'name' => $validated['customer_name'],
                'email' => $validated['customer_email'] ?? null,
                'phone' => $validated['customer_phone'] ?? null,
                'organization_name' => $validated['customer_organization_name'] ?? null,
            ]);
            $customerId = $customer->id;
        }

        if (!empty($validated['items'])) {
            $subtotal = collect($validated['items'])->sum('total_price');
            $discount = $validated['discount'] ?? 0;
            $tax = $validated['tax'] ?? 0;
            $total = $subtotal - $discount + $tax;
        } else {
            $subtotal = $validated['subtotal'];
            $discount = $validated['discount'] ?? 0;
            $tax = $validated['tax'] ?? 0;
            $total = $validated['total'];
        }

        DB::beginTransaction();

        try {
            $invoice = Invoice::create([
                'customer_id' => $customerId,
                'quotation_id' => $validated['quotation_id'] ?? null,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'tax' => $tax,
                'total' => $total,
                'paid_amount' => 0,
                'balance' => $total,
                'status' => $validated['status'] ?? 'pending',
                'due_date' => $validated['due_date'] ?? null,
            ]);

            foreach ($validated['items'] ?? [] as $item) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'service_id' => $item['service_id'] ?? null,
                    'package_id' => $item['package_id'] ?? null,
                    'item_name' => $item['item_name'],
                    'description' => $item['description'] ?? null,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['total_price'],
                ]);
            }

            DB::commit();

            return response()->json([
                'data' => $invoice->load(['customer', 'items']),
                'message' => 'Invoice created successfully.',
                'success' => true,
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create invoice.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'quotation_id' => 'nullable|exists:quotations,id',
            'subtotal' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'due_date' => 'nullable|date',
            'status' => 'nullable|string|in:pending,partial_paid,paid,overdue,cancelled',
        ]);

        $invoice->update($validated);

        return response()->json([
            'data' => $invoice->load(['customer']),
            'message' => 'Invoice updated successfully.',
            'success' => true,
        ]);
    }

    public function addPayment(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0|max:' . $invoice->balance,
            'payment_method' => 'required|string|max:255',
            'transaction_reference' => 'nullable|string|max:255',
            'payment_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $payment = Payment::create([
                'invoice_id' => $invoice->id,
                'customer_id' => $invoice->customer_id,
                'amount' => $validated['amount'],
                'payment_method' => $validated['payment_method'],
                'transaction_reference' => $validated['transaction_reference'] ?? null,
                'payment_date' => $validated['payment_date'] ?? now(),
                'notes' => $validated['notes'] ?? null,
            ]);

            $paidAmount = $invoice->paid_amount + $validated['amount'];
            $balance = $invoice->total - $paidAmount;

            $status = 'pending';
            if ($balance <= 0) {
                $status = 'paid';
            } elseif ($paidAmount > 0) {
                $status = 'partial_paid';
            }

            $invoice->update([
                'paid_amount' => $paidAmount,
                'balance' => $balance,
                'status' => $status,
            ]);

            $receipt = Receipt::create([
                'invoice_id' => $invoice->id,
                'payment_id' => $payment->id,
                'customer_id' => $invoice->customer_id,
                'amount' => $validated['amount'],
                'issued_date' => now(),
            ]);

            DB::commit();

            return response()->json([
                'data' => [
                    'invoice' => $invoice->load(['customer', 'payments']),
                    'payment' => $payment,
                    'receipt' => $receipt,
                ],
                'message' => 'Payment recorded and receipt generated.',
                'success' => true,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to record payment.',
                'error' => $e->getMessage(),
                'success' => false,
            ], 500);
        }
    }

    public function generateReceipt(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'payment_id' => 'required|exists:payments,id',
        ]);

        $payment = Payment::where('id', $validated['payment_id'])
            ->where('invoice_id', $invoice->id)
            ->firstOrFail();

        if ($payment->receipt) {
            return response()->json([
                'data' => $payment->receipt,
                'message' => 'Receipt already exists for this payment.',
                'success' => true,
            ]);
        }

        $receipt = Receipt::create([
            'invoice_id' => $invoice->id,
            'payment_id' => $payment->id,
            'customer_id' => $invoice->customer_id,
            'amount' => $payment->amount,
            'issued_date' => now(),
        ]);

        return response()->json([
            'data' => $receipt,
            'message' => 'Receipt generated successfully.',
            'success' => true,
        ], 201);
    }
}
