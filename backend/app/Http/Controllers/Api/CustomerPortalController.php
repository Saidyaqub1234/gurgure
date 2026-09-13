<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Quotation;
use App\Models\Receipt;
use Illuminate\Http\Request;

class CustomerPortalController extends Controller
{
    public function dashboard(Request $request)
    {
        $customer = $request->user();
        $customerId = $customer->id;

        $quotations = Quotation::where('customer_id', $customerId)
            ->with(['items', 'invoice'])
            ->orderBy('created_at', 'desc')
            ->get();

        $invoices = Invoice::where('customer_id', $customerId)
            ->with(['quotation.items', 'payments'])
            ->orderBy('created_at', 'desc')
            ->get();

        $payments = Payment::where('customer_id', $customerId)
            ->with(['invoice', 'receipt'])
            ->orderBy('created_at', 'desc')
            ->get();

        $receipts = Receipt::where('customer_id', $customerId)
            ->with(['invoice', 'payment'])
            ->orderBy('created_at', 'desc')
            ->get();

        $stats = [
            'total_quotations' => $quotations->count(),
            'pending_quotations' => $quotations->where('status', 'draft')->count() + $quotations->where('status', 'sent')->count(),
            'total_invoices' => $invoices->count(),
            'pending_invoices' => $invoices->where('status', 'pending')->count(),
            'total_paid' => $payments->sum('amount'),
            'total_balance' => $invoices->sum('balance'),
        ];

        return response()->json([
            'data' => [
                'customer' => $customer->makeVisible(['email', 'phone', 'address', 'organization_name']),
                'quotations' => $quotations,
                'invoices' => $invoices,
                'payments' => $payments,
                'receipts' => $receipts,
                'stats' => $stats,
            ],
            'success' => true,
        ]);
    }

    public function quotations(Request $request)
    {
        $customer = $request->user();

        $quotations = Quotation::where('customer_id', $customer->id)
            ->with(['items', 'invoice'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $quotations,
            'success' => true,
        ]);
    }

    public function invoices(Request $request)
    {
        $customer = $request->user();

        $invoices = Invoice::where('customer_id', $customer->id)
            ->with(['quotation.items', 'payments'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $invoices,
            'success' => true,
        ]);
    }

    public function payments(Request $request)
    {
        $customer = $request->user();

        $payments = Payment::where('customer_id', $customer->id)
            ->with(['invoice', 'receipt'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $payments,
            'success' => true,
        ]);
    }

    public function receipts(Request $request)
    {
        $customer = $request->user();

        $receipts = Receipt::where('customer_id', $customer->id)
            ->with(['invoice', 'payment'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $receipts,
            'success' => true,
        ]);
    }
}
