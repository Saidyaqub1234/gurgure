<?php

namespace Database\Seeders;

use App\Models\PrintOption;
use App\Models\PrintOptionGroup;
use App\Models\PrintPriceRule;
use App\Models\PrintProduct;
use Illuminate\Database\Seeder;

class PrintProductsSeeder extends Seeder
{
    public function run(): void
    {
        $this->createProduct([
            'slug' => 'business-cards',
            'name' => 'Business Cards',
            'category' => 'Business Stationery',
            'short_description' => 'Premium business cards with instant pricing. Choose size, paper, colour and finishing.',
            'price_mode' => 'instant',
            'base_price' => 3.5,
            'min_quantity' => 100,
            'unit_label' => 'card',
            'turnaround' => '2–4 days',
            'order' => 1,
            'rules' => [
                [100, 250, 3.5], [250, 500, 2.8], [500, 1000, 2.4],
                [1000, 2000, 2.0], [2000, 5000, 1.6], [5000, null, 1.2],
            ],
            'groups' => [
                [
                    'name' => 'Design', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'I have my own print-ready design', 'price' => 0, 'type' => 'one_time', 'default' => true],
                        ['name' => 'Upload design, GURGURE checks it', 'price' => 300, 'type' => 'one_time'],
                        ['name' => 'Standard GURGURE design', 'price' => 800, 'type' => 'one_time'],
                        ['name' => 'Premium custom design', 'price' => 2500, 'type' => 'one_time'],
                    ],
                ],
                [
                    'name' => 'Material', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '250 gsm Art Card', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '300 gsm Art Card', 'price' => 0.2, 'type' => 'per_unit'],
                        ['name' => '350 gsm Art Card', 'price' => 0.3, 'type' => 'per_unit'],
                        ['name' => '400 gsm Art Card', 'price' => 0.5, 'type' => 'per_unit'],
                        ['name' => 'Kraft (recycled)', 'price' => 0.2, 'type' => 'per_unit'],
                        ['name' => 'PVC Plastic', 'price' => 0.8, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Colours', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '1/0 — Black front only', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '1/1 — Black both sides', 'price' => 0.1, 'type' => 'per_unit'],
                        ['name' => '4/0 — Full colour front', 'price' => 0.15, 'type' => 'per_unit'],
                        ['name' => '4/4 — Full colour both sides', 'price' => 0.25, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Finishing', 'type' => 'checkbox', 'required' => false,
                    'options' => [
                        ['name' => 'Matte lamination', 'price' => 400, 'type' => 'one_time'],
                        ['name' => 'Gloss lamination', 'price' => 400, 'type' => 'one_time'],
                        ['name' => 'Soft-touch lamination', 'price' => 600, 'type' => 'one_time'],
                        ['name' => 'Spot UV', 'price' => 700, 'type' => 'one_time'],
                        ['name' => 'Gold / silver foil', 'price' => 1200, 'type' => 'one_time'],
                        ['name' => 'Rounded corners', 'price' => 200, 'type' => 'one_time'],
                    ],
                ],
            ],
        ]);

        $this->createProduct([
            'slug' => 'a5-flyers',
            'name' => 'Flyers (A5)',
            'category' => 'Marketing',
            'short_description' => 'High-impact A5 flyers for promotions, events and campaigns.',
            'price_mode' => 'instant',
            'base_price' => 8,
            'min_quantity' => 100,
            'unit_label' => 'flyer',
            'turnaround' => '2–3 days',
            'order' => 2,
            'rules' => [
                [100, 500, 8], [500, 1000, 5.5], [1000, 2000, 4],
                [2000, 5000, 3.2], [5000, 10000, 2.6], [10000, null, 2.2],
            ],
            'groups' => [
                [
                    'name' => 'Design', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'I have print-ready artwork', 'price' => 0, 'type' => 'one_time', 'default' => true],
                        ['name' => 'Standard GURGURE design', 'price' => 800, 'type' => 'one_time'],
                        ['name' => 'Premium custom design', 'price' => 2000, 'type' => 'one_time'],
                    ],
                ],
                [
                    'name' => 'Paper', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '90 gsm Offset', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '120 gsm Offset', 'price' => 0.1, 'type' => 'per_unit'],
                        ['name' => '150 gsm Silk', 'price' => 0.2, 'type' => 'per_unit'],
                        ['name' => '250 gsm Art Card', 'price' => 0.4, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Colours', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '1/1 — Black both sides', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '4/0 — Full colour front', 'price' => 0.15, 'type' => 'per_unit'],
                        ['name' => '4/4 — Full colour both sides', 'price' => 0.2, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Extras', 'type' => 'checkbox', 'required' => false,
                    'options' => [
                        ['name' => 'Folding', 'price' => 200, 'type' => 'one_time'],
                        ['name' => 'Matte lamination', 'price' => 500, 'type' => 'one_time'],
                        ['name' => 'Die cutting', 'price' => 900, 'type' => 'one_time'],
                    ],
                ],
            ],
        ]);

        $this->createProduct([
            'slug' => 'roll-up-banner',
            'name' => 'Roll-up Banner',
            'category' => 'Large Format',
            'short_description' => 'Professional roll-up banners for exhibitions, offices and events.',
            'price_mode' => 'instant',
            'base_price' => 850,
            'min_quantity' => 1,
            'unit_label' => 'banner',
            'turnaround' => '3–5 days',
            'order' => 3,
            'rules' => [
                [1, 2, 850], [2, 5, 800], [5, 10, 750], [10, null, 700],
            ],
            'groups' => [
                [
                    'name' => 'Size', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '85 × 200 cm', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '80 × 200 cm', 'price' => 0, 'type' => 'per_unit'],
                        ['name' => '90 × 200 cm', 'price' => 50, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Material', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'Standard', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => 'Premium satin', 'price' => 100, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Design', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'I have print-ready artwork', 'price' => 0, 'type' => 'one_time', 'default' => true],
                        ['name' => 'Standard GURGURE design', 'price' => 800, 'type' => 'one_time'],
                        ['name' => 'Premium custom design', 'price' => 2000, 'type' => 'one_time'],
                    ],
                ],
            ],
        ]);

        $this->createProduct([
            'slug' => 'custom-t-shirts',
            'name' => 'Custom T-Shirts',
            'category' => 'Apparel',
            'short_description' => 'Printed t-shirts for teams, promotions and uniforms.',
            'price_mode' => 'instant',
            'base_price' => 400,
            'min_quantity' => 1,
            'unit_label' => 't-shirt',
            'turnaround' => '5–7 days',
            'order' => 4,
            'rules' => [
                [1, 10, 400], [10, 25, 320], [25, 50, 280], [50, 100, 250], [100, null, 210],
            ],
            'groups' => [
                [
                    'name' => 'Quality', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'Economy', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => 'Standard', 'price' => 50, 'type' => 'per_unit'],
                        ['name' => 'Premium', 'price' => 120, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Branding method', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'Screen print', 'price' => 30, 'type' => 'per_unit', 'default' => true],
                        ['name' => 'UV / digital print', 'price' => 40, 'type' => 'per_unit'],
                        ['name' => 'Embroidery', 'price' => 80, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Print positions', 'type' => 'checkbox', 'required' => false,
                    'options' => [
                        ['name' => 'Front', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => 'Back', 'price' => 25, 'type' => 'per_unit'],
                        ['name' => 'Left sleeve', 'price' => 15, 'type' => 'per_unit'],
                    ],
                ],
            ],
        ]);

        $this->createProduct([
            'slug' => 'promotional-pens',
            'name' => 'Promotional Pens',
            'category' => 'Promotional',
            'short_description' => 'Branded pens for giveaways, offices and events.',
            'price_mode' => 'instant',
            'base_price' => 25,
            'min_quantity' => 50,
            'unit_label' => 'pen',
            'turnaround' => '4–6 days',
            'order' => 5,
            'rules' => [
                [50, 100, 25], [100, 250, 18], [250, 500, 14], [500, 1000, 11], [1000, null, 9],
            ],
            'groups' => [
                [
                    'name' => 'Model', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'Standard', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => 'Click / retractable', 'price' => 20, 'type' => 'per_unit'],
                        ['name' => 'Metal body', 'price' => 60, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Branding', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'Screen print', 'price' => 15, 'type' => 'per_unit', 'default' => true],
                        ['name' => 'UV print', 'price' => 20, 'type' => 'per_unit'],
                        ['name' => 'Pad print', 'price' => 25, 'type' => 'per_unit'],
                        ['name' => 'Laser engraving', 'price' => 30, 'type' => 'per_unit'],
                    ],
                ],
            ],
        ]);

        $this->createProduct([
            'slug' => 'certificates',
            'name' => 'Certificates',
            'category' => 'Paper',
            'short_description' => 'Certificates and awards on premium stock with optional framing designs.',
            'price_mode' => 'instant',
            'base_price' => 120,
            'min_quantity' => 10,
            'unit_label' => 'certificate',
            'turnaround' => '2–3 days',
            'order' => 6,
            'rules' => [
                [10, 50, 120], [50, 100, 90], [100, 250, 70], [250, 500, 55], [500, null, 45],
            ],
            'groups' => [
                [
                    'name' => 'Paper', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '160 gsm Silk', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '250 gsm Art Card', 'price' => 10, 'type' => 'per_unit'],
                        ['name' => '300 gsm Art Card', 'price' => 18, 'type' => 'per_unit'],
                        ['name' => 'Glossy photo stock', 'price' => 25, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Design', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'I have print-ready artwork', 'price' => 0, 'type' => 'one_time', 'default' => true],
                        ['name' => 'Standard GURGURE design', 'price' => 600, 'type' => 'one_time'],
                        ['name' => 'Premium custom design', 'price' => 1500, 'type' => 'one_time'],
                    ],
                ],
            ],
        ]);

        $this->createProduct([
            'slug' => 'acrylic-office-sign',
            'name' => 'Acrylic Office Sign',
            'category' => 'Signage',
            'short_description' => 'Elegant acrylic signs for offices, reception areas and rooms.',
            'price_mode' => 'estimated',
            'base_price' => 1500,
            'min_quantity' => 1,
            'unit_label' => 'sign',
            'turnaround' => '5–8 days',
            'order' => 7,
            'rules' => [
                [1, 5, 1500], [5, 10, 1300], [10, null, 1200],
            ],
            'groups' => [
                [
                    'name' => 'Size', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '30 × 20 cm', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '40 × 30 cm', 'price' => 400, 'type' => 'per_unit'],
                        ['name' => '60 × 40 cm', 'price' => 900, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Thickness', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '3 mm', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '5 mm', 'price' => 200, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Finish', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => 'Flat print', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => 'Raised / 3D letters', 'price' => 800, 'type' => 'per_unit'],
                    ],
                ],
            ],
        ]);

        $this->createProduct([
            'slug' => 'event-exhibition-booth',
            'name' => 'Exhibition Booth',
            'category' => 'Exhibition Events',
            'short_description' => 'Complete exhibition / event stand design and production.',
            'price_mode' => 'quote',
            'base_price' => 50000,
            'min_quantity' => 1,
            'unit_label' => 'booth',
            'turnaround' => '10–20 days',
            'order' => 8,
            'rules' => [
                [1, null, 50000],
            ],
            'groups' => [
                [
                    'name' => 'Booth size', 'type' => 'radio', 'required' => true,
                    'options' => [
                        ['name' => '3 × 3 m', 'price' => 0, 'type' => 'per_unit', 'default' => true],
                        ['name' => '3 × 6 m', 'price' => 25000, 'type' => 'per_unit'],
                        ['name' => '6 × 6 m', 'price' => 60000, 'type' => 'per_unit'],
                    ],
                ],
                [
                    'name' => 'Includes', 'type' => 'checkbox', 'required' => false,
                    'options' => [
                        ['name' => 'Backdrop', 'price' => 15000, 'type' => 'one_time'],
                        ['name' => 'Counters', 'price' => 12000, 'type' => 'one_time'],
                        ['name' => 'Roll-up banners', 'price' => 9000, 'type' => 'one_time'],
                        ['name' => 'Lighting', 'price' => 10000, 'type' => 'one_time'],
                    ],
                ],
            ],
        ]);
    }

    protected function createProduct(array $def): void
    {
        $product = PrintProduct::create([
            'slug' => $def['slug'],
            'name' => $def['name'],
            'category' => $def['category'],
            'short_description' => $def['short_description'],
            'image' => $def['image'] ?? null,
            'price_mode' => $def['price_mode'],
            'base_price' => $def['base_price'] ?? null,
            'setup_cost' => $def['setup_cost'] ?? 0,
            'min_quantity' => $def['min_quantity'] ?? 1,
            'unit_label' => $def['unit_label'] ?? null,
            'turnaround' => $def['turnaround'] ?? null,
            'is_published' => true,
            'order' => $def['order'] ?? 0,
        ]);

        foreach ($def['rules'] as $rule) {
            $product->priceRules()->create([
                'min_qty' => $rule[0],
                'max_qty' => $rule[1],
                'unit_price' => $rule[2],
            ]);
        }

        foreach ($def['groups'] as $g) {
            $group = $product->optionGroups()->create([
                'name' => $g['name'],
                'type' => $g['type'],
                'required' => $g['required'],
            ]);
            foreach (($g['options'] ?? []) as $o) {
                $group->options()->create([
                    'name' => $o['name'],
                    'price' => $o['price'] ?? 0,
                    'price_type' => $o['type'] ?? 'none',
                    'is_default' => $o['default'] ?? false,
                ]);
            }
        }
    }
}