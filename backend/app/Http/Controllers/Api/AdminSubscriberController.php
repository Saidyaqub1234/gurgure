<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;

class AdminSubscriberController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => NewsletterSubscriber::orderBy('created_at', 'desc')->get(),
            'success' => true,
        ]);
    }

    public function destroy(NewsletterSubscriber $subscriber)
    {
        $subscriber->delete();

        return response()->json([
            'message' => 'Subscriber deleted successfully.',
            'success' => true,
        ]);
    }
}
