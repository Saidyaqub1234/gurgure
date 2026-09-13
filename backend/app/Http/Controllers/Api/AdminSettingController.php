<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class AdminSettingController extends Controller
{
    public function index()
    {
        $data = [
            'site_name' => Setting::get('site_name', 'GURGURE'),
            'site_tagline' => Setting::get('site_tagline', 'Making Visible Brands'),
            'site_description' => Setting::get('site_description', ''),
            'logo' => Setting::get('logo', ''),
            'email' => Setting::get('email', 'info@gurgure.com'),
            'phone' => Setting::get('phone', '+93 700 777 480'),
            'kabul_address' => Setting::get('kabul_address', 'Afshare, Kabul, Afghanistan'),
            'kandahar_address' => Setting::get('kandahar_address', 'Shaheedano Chowk, Etemad Market, 2nd Floor, Kandahar, Afghanistan'),
            'linkedin' => Setting::get('linkedin', '#'),
            'facebook' => Setting::get('facebook', '#'),
            'instagram' => Setting::get('instagram', '#'),
            'twitter' => Setting::get('twitter', '#'),
            'youtube' => Setting::get('youtube', '#'),
            'about_vision' => Setting::get('about_vision', ''),
            'about_mission' => Setting::get('about_mission', ''),
            'about_history' => Setting::get('about_history', ''),
            'hero_title' => Setting::get('hero_title', ''),
            'hero_subtitle' => Setting::get('hero_subtitle', ''),
            'hero_images' => Setting::get('hero_images', ''),
            'home_stats' => Setting::get('home_stats', ''),
            'nav_links' => Setting::get('nav_links', ''),
            'footer_services' => Setting::get('footer_services', ''),
            'approach_steps' => Setting::get('approach_steps', ''),
            'page_hero_data' => Setting::get('page_hero_data', ''),
            'cta_data' => Setting::get('cta_data', ''),
        ];
        $skipLang = ['logo', 'email', 'phone', 'linkedin', 'facebook', 'instagram', 'twitter', 'youtube'];
        foreach (array_keys($data) as $key) {
            if (in_array($key, $skipLang)) continue;
            foreach (['fa', 'ps'] as $lang) {
                $data[$key . '_' . $lang] = Setting::get($key . '_' . $lang, '');
            }
        }
        return response()->json(['data' => $data, 'success' => true]);
    }

    public function update(Request $request)
    {
        foreach ($request->all() as $key => $value) {
            Setting::set($key, $value);
        }

        return response()->json([
            'message' => 'Settings updated successfully.',
            'success' => true,
        ]);
    }
}
