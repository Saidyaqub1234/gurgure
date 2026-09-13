<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrintOrder;
use Illuminate\Http\Request;

class AdminPrintOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = PrintOrder::query();
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_no', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        $orders = $query->orderByDesc('id')->paginate($request->get('per_page', 20));

        return response()->json(['data' => $orders, 'success' => true]);
    }

    public function show(PrintOrder $printOrder)
    {
        $printOrder->load('customer');
        return response()->json(['data' => $printOrder, 'success' => true]);
    }

    public function update(Request $request, PrintOrder $printOrder)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,in_production,quality_check,delivered,cancelled',
        ]);
        $printOrder->update(['status' => $request->status]);

        return response()->json([
            'data' => $printOrder,
            'message' => 'Order updated successfully.',
            'success' => true,
        ]);
    }

    public function destroy(PrintOrder $printOrder)
    {
        $printOrder->delete();

        return response()->json([
            'message' => 'Order deleted successfully.',
            'success' => true,
        ]);
    }
}