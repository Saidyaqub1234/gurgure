<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => [
                'site_name' => Setting::get('site_name', 'GURGURE'),
                'site_tagline' => Setting::get('site_tagline', 'Making Visible Brands'),
                'site_description' => Setting::get('site_description', ''),
                'email' => Setting::get('email', 'info@gurgure.com'),
                'phone' => Setting::get('phone', '+93 700 777 480'),
                'kabul_address' => Setting::get('kabul_address', 'Afshare, Kabul, Afghanistan'),
                'kandahar_address' => Setting::get('kandahar_address', 'Shaheedano Chowk, Etemad Market, 2nd Floor, Kandahar, Afghanistan'),
                'linkedin' => Setting::get('linkedin', '#'),
                'facebook' => Setting::get('facebook', '#'),
                'instagram' => Setting::get('instagram', '#'),
            ]
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        foreach ($request->all() as $key => $value) {
            if ($key !== '_token' && $key !== '_method') {
                Setting::set($key, $value);
            }
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings updated successfully.');
    }
}
