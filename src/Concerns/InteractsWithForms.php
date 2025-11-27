<?php

namespace Laravilt\Forms\Concerns;

trait InteractsWithForms
{
    protected array $cachedForms = [];

    /**
     * Get the forms available on the page.
     */
    protected function getForms(): array
    {
        return [];
    }

    /**
     * Get the schema for the default form.
     */
    protected function getSchema(): array
    {
        return [];
    }
}
