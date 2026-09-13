<?php

namespace App\Services;

use App\Models\PrintProduct;
use Illuminate\Validation\ValidationException;

class PrintPricingService
{
    /**
     * Build a price breakdown for a product given quantity and option selections.
     *
     * @param PrintProduct $product
     * @param int $qty
     * @param array $selections map of group_id => option_ids[]
     * @return array
     */
    public function calculate(PrintProduct $product, int $qty, array $selections = []): array
    {
        $qty = max($product->min_quantity, $qty);

        $groups = $product->optionGroups()->with('options')->get();

        // Validate required groups and single-select groups.
        foreach ($groups as $group) {
            $selected = $selections[$group->id] ?? [];
            if (is_array($selected) === false) {
                $selected = (array) $selected;
            }
            if ($group->required && count($selected) === 0) {
                throw ValidationException::withMessages([
                    'selections' => "Please choose an option for {$group->name}.",
                ]);
            }
            if (in_array($group->type, ['radio', 'select']) && count($selected) > 1) {
                throw ValidationException::withMessages([
                    'selections' => "Only one option allowed for {$group->name}.",
                ]);
            }
            // Ensure selected options belong to this group.
            $validIds = $group->options->pluck('id')->all();
            foreach ($selected as $id) {
                if (!in_array((int) $id, $validIds)) {
                    throw ValidationException::withMessages([
                        'selections' => "Invalid option for {$group->name}.",
                    ]);
                }
            }
        }

        // Determine unit price from quantity matrix, else base price.
        $unit = $this->resolveUnitPrice($product, $qty);
        if ($unit === null) {
            throw ValidationException::withMessages([
                'qty' => 'No pricing available for this quantity. Please request a quote.',
            ]);
        }

        $lineItems = [];

        // Printing line
        $lineItems[] = [
            'label' => $product->name . ' (' . number_format($qty) . ' × AFN ' . number_format($unit, 2) . ')',
            'amount' => round($qty * $unit, 2),
            'type' => 'printing',
        ];

        // Option add-ons
        $perUnitTotal = 0.0;
        $oneTimeTotal = 0.0;
        $optionLabels = [];
        foreach ($groups as $group) {
            $selected = $selections[$group->id] ?? [];
            if (is_array($selected) === false) {
                $selected = (array) $selected;
            }
            foreach ($selected as $id) {
                $option = $group->options->firstWhere('id', (int) $id);
                if (!$option || $option->price_type === 'none' || $option->price <= 0) {
                    continue;
                }
                if ($option->price_type === 'per_unit') {
                    $perUnitTotal += $option->price;
                    $lineItems[] = [
                        'label' => $option->name . ' × ' . number_format($qty),
                        'amount' => round($option->price * $qty, 2),
                        'type' => 'option',
                    ];
                } else {
                    $oneTimeTotal += $option->price;
                    $lineItems[] = [
                        'label' => $option->name,
                        'amount' => round($option->price, 2),
                        'type' => 'finishing',
                    ];
                }
                $optionLabels[] = $option->name;
            }
        }

        // Setup cost
        if ($product->setup_cost > 0) {
            $lineItems[] = [
                'label' => 'Setup',
                'amount' => round($product->setup_cost, 2),
                'type' => 'setup',
            ];
        }

        $total = round($qty * $unit + $perUnitTotal * $qty + $oneTimeTotal + $product->setup_cost, 2);

        return [
            'mode' => $product->price_mode,
            'product_id' => $product->id,
            'product_slug' => $product->slug,
            'qty' => $qty,
            'unit_price' => round($unit, 2),
            'effective_per_unit' => round($unit + $perUnitTotal, 2),
            'line_items' => $lineItems,
            'total' => $total,
            'currency' => 'AFN',
            'options' => $optionLabels,
            'estimate_low' => $product->price_mode === 'estimated' ? round($total * 0.9, 2) : null,
            'estimate_high' => $product->price_mode === 'estimated' ? round($total * 1.1, 2) : null,
        ];
    }

    public function resolveUnitPrice(PrintProduct $product, int $qty): ?float
    {
        $rules = $product->priceRules()->get()->sortByDesc('min_qty');
        foreach ($rules as $rule) {
            if ($qty >= $rule->min_qty && ($rule->max_qty === null || $qty <= $rule->max_qty)) {
                return (float) $rule->unit_price;
            }
        }
        return $product->base_price !== null ? (float) $product->base_price : null;
    }
}