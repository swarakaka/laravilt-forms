<?php

namespace Laravilt\Forms\Components;

use Closure;

class IconPicker extends Field
{
    protected string $view = 'laravilt-forms::components.fields.icon-picker';

    protected array|Closure $icons = [];

    protected bool|Closure $searchable = true;

    protected string|Closure|null $placeholder = null;

    protected int|Closure $gridColumns = 8;

    protected bool|Closure $showIconName = true;

    /**
     * Whether to allow multiple icon selection.
     */
    protected bool|Closure $multiple = false;

    /**
     * Maximum number of icons that can be selected.
     */
    protected int|Closure|null $maxItems = null;

    /**
     * Minimum number of icons that must be selected.
     */
    protected int|Closure|null $minItems = null;

    /**
     * Set the available icons.
     */
    public function icons(array|Closure $icons): static
    {
        $this->icons = $icons;

        return $this;
    }

    /**
     * Enable/disable search functionality.
     */
    public function searchable(bool|Closure $condition = true): static
    {
        $this->searchable = $condition;

        return $this;
    }

    /**
     * Set the placeholder text.
     */
    public function placeholder(string|Closure|null $placeholder): static
    {
        $this->placeholder = $placeholder;

        return $this;
    }

    /**
     * Set the number of grid columns.
     */
    public function gridColumns(int|Closure $columns): static
    {
        $this->gridColumns = $columns;

        return $this;
    }

    /**
     * Show/hide icon name below each icon.
     */
    public function showIconName(bool|Closure $condition = true): static
    {
        $this->showIconName = $condition;

        return $this;
    }

    /**
     * Enable multiple icon selection.
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
     * Set the maximum number of icons.
     */
    public function maxItems(int|Closure|null $count): static
    {
        $this->maxItems = $count;

        return $this;
    }

    /**
     * Get the maximum number of icons.
     */
    public function getMaxItems(): ?int
    {
        return $this->evaluate($this->maxItems);
    }

    /**
     * Set the minimum number of icons.
     */
    public function minItems(int|Closure|null $count): static
    {
        $this->minItems = $count;

        return $this;
    }

    /**
     * Get the minimum number of icons.
     */
    public function getMinItems(): ?int
    {
        return $this->evaluate($this->minItems);
    }

    /**
     * Get the icons array.
     */
    protected function getIcons(): array
    {
        $icons = $this->evaluate($this->icons);

        // If no icons specified, return popular Lucide icons
        if (empty($icons)) {
            return $this->getDefaultIcons();
        }

        return is_array($icons) ? $icons : [];
    }

    /**
     * Get default popular Lucide icons.
     */
    protected function getDefaultIcons(): array
    {
        return [
            'home', 'user', 'users', 'settings', 'search', 'heart', 'star',
            'mail', 'phone', 'message-square', 'bell', 'calendar', 'clock',
            'map-pin', 'tag', 'folder', 'file', 'image', 'video', 'music',
            'download', 'upload', 'trash', 'edit', 'check', 'x', 'plus', 'minus',
            'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down',
            'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
            'external-link', 'link', 'copy', 'share', 'bookmark', 'flag',
            'shield', 'lock', 'unlock', 'eye', 'eye-off', 'help-circle',
            'info', 'alert-circle', 'alert-triangle', 'check-circle', 'x-circle',
            'sun', 'moon', 'cloud', 'zap', 'droplet', 'flame',
            'shopping-cart', 'shopping-bag', 'credit-card', 'dollar-sign',
            'briefcase', 'layers', 'grid', 'list', 'menu', 'more-horizontal',
        ];
    }

    protected function getVueComponent(): string
    {
        return 'IconPicker';
    }

    protected function getVueProps(): array
    {
        return [
            'icons' => $this->getIcons(),
            'searchable' => $this->evaluate($this->searchable),
            'placeholder' => $this->evaluate($this->placeholder) ?? 'Select an icon...',
            'gridColumns' => $this->evaluate($this->gridColumns),
            'showIconName' => $this->evaluate($this->showIconName),
            'required' => $this->isRequired(),
            'rules' => $this->getValidationRules(),
            'defaultValue' => $this->getState(),
        ];
    }

    protected function getFlutterWidget(): string
    {
        return 'LaraviltIconPicker';
    }

    protected function getFlutterWidgetProps(): array
    {
        return [
            'icons' => $this->getIcons(),
            'searchable' => $this->evaluate($this->searchable),
            'placeholder' => $this->evaluate($this->placeholder) ?? 'Select an icon...',
            'gridColumns' => $this->evaluate($this->gridColumns),
            'showIconName' => $this->evaluate($this->showIconName),
            'required' => $this->isRequired(),
            'validators' => $this->getValidationRules(),
            'initialValue' => $this->getState(),
        ];
    }

    public function toLaraviltProps(): array
    {
        return array_merge(parent::toLaraviltProps(), [
            'name' => $this->name,
            'icons' => $this->getIcons(),
            'searchable' => $this->evaluate($this->searchable),
            'gridColumns' => $this->evaluate($this->gridColumns),
            'showIconName' => $this->evaluate($this->showIconName),
            'multiple' => $this->isMultiple(),
            'maxItems' => $this->getMaxItems(),
            'minItems' => $this->getMinItems(),
            'translations' => [
                'placeholder' => $this->evaluate($this->placeholder) ?? __('forms::forms.icon_picker.placeholder'),
                'searchPlaceholder' => __('forms::forms.icon_picker.search_placeholder'),
                'noIconsFound' => __('forms::forms.icon_picker.no_icons_found'),
            ],
        ]);
    }
}
