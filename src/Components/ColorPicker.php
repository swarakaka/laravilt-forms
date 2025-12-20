<?php

namespace Laravilt\Forms\Components;

use Closure;

/**
 * Color Picker Component
 *
 * A color picker field with support for:
 * - Hex colors
 * - RGB/RGBA colors
 * - Predefined color swatches
 * - Alpha channel (transparency)
 * - Multiple color selection
 */
class ColorPicker extends Field
{
    protected string $view = 'laravilt-forms::components.fields.color-picker';

    /**
     * Whether to show alpha channel control.
     */
    protected bool|Closure $alpha = false;

    /**
     * Format for color value (hex, rgb, hsl).
     */
    protected string|Closure $format = 'hex';

    /**
     * Predefined color swatches.
     */
    protected array|Closure $swatches = [];

    /**
     * Whether to show the swatches.
     */
    protected bool|Closure $showSwatches = false;

    /**
     * Whether to allow multiple color selection.
     */
    protected bool|Closure $multiple = false;

    /**
     * Maximum number of colors that can be selected.
     */
    protected int|Closure|null $maxItems = null;

    /**
     * Minimum number of colors that must be selected.
     */
    protected int|Closure|null $minItems = null;

    /**
     * Popup position for the color picker.
     * Supported values: 'top', 'bottom', 'left', 'right', 'top-start', 'top-end',
     * 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'.
     */
    protected string|Closure $popupPosition = 'bottom-start';

    /**
     * Enable alpha channel control.
     */
    public function alpha(bool|Closure $condition = true): static
    {
        $this->alpha = $condition;

        return $this;
    }

    /**
     * Set the color format.
     */
    public function format(string|Closure $format): static
    {
        $this->format = $format;

        return $this;
    }

    /**
     * Set predefined color swatches.
     */
    public function swatches(array|Closure $swatches): static
    {
        $this->swatches = $swatches;
        $this->showSwatches = true;

        return $this;
    }

    /**
     * Check if alpha channel is enabled.
     */
    public function hasAlpha(): bool
    {
        return $this->evaluate($this->alpha);
    }

    /**
     * Get the color format.
     */
    public function getFormat(): string
    {
        return $this->evaluate($this->format);
    }

    /**
     * Get the color swatches.
     */
    public function getSwatches(): array
    {
        return $this->evaluate($this->swatches);
    }

    /**
     * Check if swatches should be shown.
     */
    public function shouldShowSwatches(): bool
    {
        return $this->evaluate($this->showSwatches) && count($this->getSwatches()) > 0;
    }

    /**
     * Enable multiple color selection.
     */
    public function multiple(bool|Closure $condition = true): static
    {
        $this->multiple = $condition;

        return $this;
    }

    /**
     * Check if multiple selection is enabled.
     */
    public function isMultiple(): bool
    {
        return $this->evaluate($this->multiple);
    }

    /**
     * Set the maximum number of colors.
     */
    public function maxItems(int|Closure|null $count): static
    {
        $this->maxItems = $count;

        return $this;
    }

    /**
     * Get the maximum number of colors.
     */
    public function getMaxItems(): ?int
    {
        return $this->evaluate($this->maxItems);
    }

    /**
     * Set the minimum number of colors.
     */
    public function minItems(int|Closure|null $count): static
    {
        $this->minItems = $count;

        return $this;
    }

    /**
     * Get the minimum number of colors.
     */
    public function getMinItems(): ?int
    {
        return $this->evaluate($this->minItems);
    }

    /**
     * Set the popup position for the color picker.
     *
     * @param  string|Closure  $position  Position value (top, bottom, left, right, top-start, etc.)
     */
    public function popupPosition(string|Closure $position): static
    {
        $this->popupPosition = $position;

        return $this;
    }

    /**
     * Get the popup position.
     */
    public function getPopupPosition(): string
    {
        return $this->evaluate($this->popupPosition);
    }

    /**
     * Serialize component for Laravilt (Blade + Vue.js).
     */
    public function toLaraviltProps(): array
    {
        return array_merge(parent::toLaraviltProps(), [
            'alpha' => $this->hasAlpha(),
            'format' => $this->getFormat(),
            'swatches' => $this->getSwatches(),
            'showSwatches' => $this->shouldShowSwatches(),
            'multiple' => $this->isMultiple(),
            'maxItems' => $this->getMaxItems(),
            'minItems' => $this->getMinItems(),
            'popupPosition' => $this->getPopupPosition(),
            'translations' => [
                'placeholder' => __('forms::forms.color_picker.placeholder'),
                'swatches' => __('forms::forms.color_picker.swatches'),
                'commonColors' => __('forms::forms.color_picker.common_colors'),
            ],
        ]);
    }
}
