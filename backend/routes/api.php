<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminBlogController;
use App\Http\Controllers\Api\AdminCustomerController;
use App\Http\Controllers\Api\AdminClientController;
use App\Http\Controllers\Api\AdminContactController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AdminCaseStudyController;
use App\Http\Controllers\Api\AdminFAQController;
use App\Http\Controllers\Api\AdminInvoiceController;
use App\Http\Controllers\Api\AdminPackageController;
use App\Http\Controllers\Api\AdminPackageItemController;
use App\Http\Controllers\Api\AdminPageController;
use App\Http\Controllers\Api\AdminProfileController;
use App\Http\Controllers\Api\AdminPrintOrderController;
use App\Http\Controllers\Api\AdminPrintProductController;
use App\Http\Controllers\Api\AdminSoftwareProductController;
use App\Http\Controllers\Api\AdminProjectController;
use App\Http\Controllers\Api\AdminQuotationController;
use App\Http\Controllers\Api\AdminReceiptController;
use App\Http\Controllers\Api\AdminServiceController;
use App\Http\Controllers\Api\AdminSettingController;
use App\Http\Controllers\Api\AdminSubscriberController;
use App\Http\Controllers\Api\AdminTeamController;
use App\Http\Controllers\Api\AdminTestimonialController;
use App\Http\Controllers\Api\AdminUploadController;
use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\CustomerAuthController;
use App\Http\Controllers\Api\CustomerPortalController;
use App\Http\Controllers\Api\PublicApiController;
use App\Http\Controllers\Api\PublicPrintController;
use App\Http\Controllers\Api\PublicQuotationController;
use App\Http\Controllers\Api\PublicSoftwareController;
use Illuminate\Support\Facades\Route;

// Public API
Route::get('/settings', [PublicApiController::class, 'settings']);
Route::get('/pages/{slug}', [PublicApiController::class, 'page']);
Route::get('/services', [PublicApiController::class, 'services']);
Route::get('/services/{slug}', [PublicApiController::class, 'service']);
Route::get('/projects', [PublicApiController::class, 'projects']);
Route::get('/projects/{slug}', [PublicApiController::class, 'project']);
Route::get('/blogs', [PublicApiController::class, 'blogs']);
Route::get('/blogs/{slug}', [PublicApiController::class, 'blogShow']);
Route::get('/clients', [PublicApiController::class, 'clients']);
Route::get('/team', [PublicApiController::class, 'team']);
Route::get('/testimonials', [PublicApiController::class, 'testimonials']);
Route::get('/case-studies', [PublicApiController::class, 'caseStudies']);
Route::get('/faqs', [PublicApiController::class, 'faqs']);
Route::post('/contact', [PublicApiController::class, 'contactSubmit']);
Route::post('/newsletter', [PublicApiController::class, 'newsletterSubscribe']);
Route::post('/customer/register', [CustomerAuthController::class, 'register']);
Route::post('/customer/login', [CustomerAuthController::class, 'login']);
Route::post('/customer/forgot-password', [CustomerAuthController::class, 'forgotPassword']);
Route::post('/customer/reset-password', [CustomerAuthController::class, 'resetPassword']);

// Customer Auth (protected)
Route::middleware(['auth:sanctum', 'customer'])->prefix('customer')->group(function () {
    Route::post('/logout', [CustomerAuthController::class, 'logout']);
    Route::get('/me', [CustomerAuthController::class, 'me']);
    Route::post('/change-password', [CustomerAuthController::class, 'changePassword']);
    Route::post('/update-profile', [CustomerAuthController::class, 'updateProfile']);
    Route::post('/upload', [CustomerAuthController::class, 'upload']);
    Route::get('/portal', [CustomerPortalController::class, 'dashboard']);
    Route::get('/portal/quotations', [CustomerPortalController::class, 'quotations']);
    Route::get('/portal/invoices', [CustomerPortalController::class, 'invoices']);
    Route::get('/portal/payments', [CustomerPortalController::class, 'payments']);
    Route::get('/portal/receipts', [CustomerPortalController::class, 'receipts']);
});

// Public Quotation API
Route::get('/services-with-packages', [PublicQuotationController::class, 'getServicesWithPackages']);
Route::get('/packages/{id}/items', [PublicQuotationController::class, 'getPackageWithItems']);
Route::get('/quotations/{quotation_no}', [PublicQuotationController::class, 'viewQuotation']);
Route::post('/quotations', [PublicQuotationController::class, 'submitQuotation']);
Route::post('/quotations/{quotation_no}/accept', [PublicQuotationController::class, 'acceptQuotation']);

// Public Print Shop API
Route::get('/print-products', [PublicPrintController::class, 'index']);
Route::get('/print-products/{slug}', [PublicPrintController::class, 'show']);
Route::post('/print-products/{slug}/price', [PublicPrintController::class, 'price']);
Route::post('/print/orders', [PublicPrintController::class, 'storeOrder']);

// Public Software API
Route::get('/software', [PublicSoftwareController::class, 'index']);
Route::get('/software/{slug}', [PublicSoftwareController::class, 'show']);

// Admin Auth
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
    Route::get('/admin/me', [AdminAuthController::class, 'me']);
});

// Admin CRUD (all protected by auth:sanctum + admin gate)
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index']);
    Route::apiResource('pages', AdminPageController::class);
    Route::apiResource('services', AdminServiceController::class);
    Route::apiResource('projects', AdminProjectController::class);
    Route::apiResource('blogs', AdminBlogController::class);
    Route::apiResource('clients', AdminClientController::class);
    Route::apiResource('team', AdminTeamController::class)->parameters(['team' => 'team_member']);
    Route::apiResource('testimonials', AdminTestimonialController::class);
    Route::apiResource('faqs', AdminFAQController::class);
    Route::apiResource('case-studies', AdminCaseStudyController::class);
    Route::get('contacts', [AdminContactController::class, 'index']);
    Route::get('contacts/{contact}', [AdminContactController::class, 'show']);
    Route::post('contacts/{contact}/read', [AdminContactController::class, 'markRead']);
    Route::delete('contacts/{contact}', [AdminContactController::class, 'destroy']);
    Route::get('subscribers', [AdminSubscriberController::class, 'index']);
    Route::delete('subscribers/{subscriber}', [AdminSubscriberController::class, 'destroy']);
    Route::apiResource('customers', AdminCustomerController::class);
    Route::get('settings', [AdminSettingController::class, 'index']);
    Route::post('settings', [AdminSettingController::class, 'update']);
    Route::post('/upload', [AdminUploadController::class, 'upload']);
    Route::apiResource('users', AdminUserController::class);
    Route::post('profile', [AdminProfileController::class, 'updateProfile']);
    Route::post('profile/password', [AdminProfileController::class, 'updatePassword']);

    // Quotation System Admin
    Route::apiResource('packages', AdminPackageController::class);
    Route::apiResource('package-items', AdminPackageItemController::class);
    Route::apiResource('quotations', AdminQuotationController::class);
    Route::apiResource('invoices', AdminInvoiceController::class);
    Route::apiResource('receipts', AdminReceiptController::class);
    Route::post('quotations/{quotation}/send', [AdminQuotationController::class, 'send']);
    Route::post('quotations/{quotation}/accept', [AdminQuotationController::class, 'accept']);
    Route::post('quotations/{quotation}/reject', [AdminQuotationController::class, 'reject']);
    Route::post('invoices/{invoice}/payment', [AdminInvoiceController::class, 'addPayment']);

    // Print Shop Admin
    Route::apiResource('print-products', AdminPrintProductController::class);
    Route::get('print-orders', [AdminPrintOrderController::class, 'index']);
    Route::get('print-orders/{printOrder}', [AdminPrintOrderController::class, 'show']);
    Route::put('print-orders/{printOrder}', [AdminPrintOrderController::class, 'update']);
    Route::delete('print-orders/{printOrder}', [AdminPrintOrderController::class, 'destroy']);
    Route::post('invoices/{invoice}/generate-receipt', [AdminInvoiceController::class, 'generateReceipt']);

    // Software Admin
    Route::apiResource('software-products', AdminSoftwareProductController::class);
});
