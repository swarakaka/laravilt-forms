<?php

use Laravilt\Forms\Components\Select;

beforeEach(function () {
    $this->select = Select::make('test-select');
});

it('can be instantiated with make method', function () {
    $select = Select::make('test');

    expect($select)->toBeInstanceOf(Select::class)
        ->and($select->getName())->toBe('test');
});

it('can set options', function () {
    $options = [
        '1' => 'Option 1',
        '2' => 'Option 2',
    ];

    $this->select->options($options);

    expect($this->select->getOptions())->toBe($options);
});

it('supports closure for options', function () {
    $this->select->options(fn () => ['1' => 'Option 1', '2' => 'Option 2']);

    expect($this->select->getOptions())->toHaveCount(2);
});

it('can be made searchable', function () {
    $this->select->searchable();

    $props = $this->select->toLaraviltProps();

    expect($props['searchable'])->toBeTrue()
        ->and($props['native'])->toBeFalse();
});

it('can be made searchable with specific columns', function () {
    $this->select->searchable(['name', 'email']);

    $props = $this->select->toLaraviltProps();

    expect($props['searchable'])->toBeTrue();
});

it('can allow multiple selections', function () {
    $this->select->multiple();

    $props = $this->select->toLaraviltProps();

    expect($props['multiple'])->toBeTrue();
});

it('uses native select by default', function () {
    $props = $this->select->toLaraviltProps();

    expect($props['native'])->toBeTrue();
});

it('can use custom dropdown instead of native', function () {
    $this->select->native(false);

    $props = $this->select->toLaraviltProps();

    expect($props['native'])->toBeFalse();
});

it('can set loading message', function () {
    $this->select->loadingMessage('Loading options...');

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('loadingMessage')
        ->and($props['loadingMessage'])->toBe('Loading options...');
});

it('can set no search results message', function () {
    $this->select->noSearchResultsMessage('No results found');

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('noSearchResultsMessage')
        ->and($props['noSearchResultsMessage'])->toBe('No results found');
});

it('can set search prompt', function () {
    $this->select->searchPrompt('Search...');

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('searchPrompt')
        ->and($props['searchPrompt'])->toBe('Search...');
});

it('can set search debounce', function () {
    $this->select->searchDebounce(500);

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('searchDebounce')
        ->and($props['searchDebounce'])->toBe(500);
});

it('has default search debounce of 1000ms', function () {
    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('searchDebounce')
        ->and($props['searchDebounce'])->toBe(1000);
});

it('can set options limit', function () {
    $this->select->optionsLimit(25);

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('optionsLimit')
        ->and($props['optionsLimit'])->toBe(25);
});

it('can set min items for multi-select', function () {
    $this->select->minItems(2);

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('minItems')
        ->and($props['minItems'])->toBe(2);
});

it('can set max items for multi-select', function () {
    $this->select->maxItems(5);

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('maxItems')
        ->and($props['maxItems'])->toBe(5);
});

it('can be configured as boolean select', function () {
    $this->select->boolean('True', 'False', 'Choose');

    $options = $this->select->getOptions();

    expect($options)->toHaveCount(2)
        ->and($options[1])->toBe('True')
        ->and($options[0])->toBe('False');
});

it('can depend on other fields', function () {
    $this->select->dependsOn(['country', 'state']);

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('dependsOn')
        ->and($props['dependsOn'])->toBe(['country', 'state']);
});

it('can set options URL', function () {
    $this->select->optionsUrl('/api/options');

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('optionsUrl')
        ->and($props['optionsUrl'])->toBe('/api/options');
});

it('can allow HTML in option labels', function () {
    $this->select->allowHtml();

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('allowHtml')
        ->and($props['allowHtml'])->toBeTrue();
});

it('can wrap option labels', function () {
    $this->select->wrapOptionLabels();

    $props = $this->select->toLaraviltProps();
    expect($props)->toHaveKey('wrapOptionLabels')
        ->and($props['wrapOptionLabels'])->toBeTrue();
});

it('serializes options to correct format', function () {
    $this->select->options([
        '1' => 'Option 1',
        '2' => 'Option 2',
    ]);

    $props = $this->select->toLaraviltProps();

    expect($props)->toHaveKey('options')
        ->and($props['options'])->toHaveCount(2)
        ->and($props['options'][0])->toHaveKey('value')
        ->and($props['options'][0])->toHaveKey('label')
        ->and($props['options'][0]['value'])->toBe('1')
        ->and($props['options'][0]['label'])->toBe('Option 1');
});

it('supports method chaining', function () {
    $result = $this->select
        ->options(['1' => 'Option 1'])
        ->searchable()
        ->multiple()
        ->native(false);

    expect($result)->toBe($this->select);
});
