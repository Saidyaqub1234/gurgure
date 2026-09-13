<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SoftwareProduct;
use Illuminate\Http\Request;

class PublicSoftwareController extends Controller
{
    protected function lang(Request $request): string
    {
        $lang = $request->header('X-Language', 'en');
        return in_array($lang, ['fa', 'ps']) ? $lang : 'en';
    }

    public function index(Request $request)
    {
        $lang = $this->lang($request);
        $products = SoftwareProduct::where('is_published', true)->orderBy('order')->get();

        $categories = $products->groupBy('category')->map(fn ($group) => [
            'name' => $group->first()->category,
            'count' => $group->count(),
        ])->values();

        $serialized = $products->map(fn ($p) => $p->toPublicArray($lang))->values();

        if ($request->filled('category') || $request->filled('cat')) {
            $filterCat = $request->filled('category') ? $request->category : $request->cat;
            $serialized = $serialized->filter(fn ($p) => $p['category'] === $filterCat)->values();
        }

        return response()->json([
            'data' => $serialized,
            'categories' => $categories->all(),
            'success' => true,
        ]);
    }

    public function show($slug, Request $request)
    {
        $product = SoftwareProduct::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return response()->json(['data' => $product->toPublicArray($this->lang($request)), 'success' => true]);
    }
}