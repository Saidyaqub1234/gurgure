<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Receipt;
use Illuminate\Http\Request;

class AdminReceiptController extends Controller
{
    public function index(Request $request)
    {
        $query = Receipt::with(['invoice', 'payment', 'customer']);

        if ($request->has('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->has('invoice_id')) {
            $query->where('invoice_id', $request->invoice_id);
        }

        $receipts = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'data' => $receipts,
            'success' => true,
        ]);
    }

    public function show(Receipt $receipt)
    {
        return response()->json([
            'data' => $receipt->load(['invoice.customer', 'payment', 'customer']),
            'success' => true,
        ]);
    }
}
