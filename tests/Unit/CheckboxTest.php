<?php

use Laravilt\Forms\Components\Checkbox;

beforeEach(function () {
    $this->checkbox = Checkbox::make('test-checkbox');
});

it('can be instantiated with make method', function () {
    $checkbox = Checkbox::make('test');

    expect($checkbox)->toBeInstanceOf(Checkbox::class)
        ->and($checkbox->getName())->toBe('test');
});

it('can set options for checkbox list', function () {
    $options = [
        'option1' => 'Option 1',
        'option2' => 'Option 2',
    ];

    $this->checkbox->options($options);

    expect($this->checkbox->getOptions())->toBe($options);
});

it('is not a checkbox list by default', function () {
    expect($this->checkbox->isCheckboxList())->toBeFalse();
});

it('is a checkbox list when options are set', function () {
    $this->checkbox->options(['opt1' => 'Option 1']);

    expect($this->checkbox->isCheckboxList())->toBeTrue();
});

it('can set inline layout', function () {
    $this->checkbox->inline();

    expect($this->checkbox->isInline())->toBeTrue();
});

it('is not inline by default', function () {
    expect($this->checkbox->isInline())->toBeFalse();
});

it('can set custom checked value', function () {
    $this->checkbox->checkedValue('yes');

    expect($this->checkbox->getCheckedValue())->toBe('yes');
});

it('has true as default checked value', function () {
    expect($this->checkbox->getCheckedValue())->toBe(true);
});

it('can set custom unchecked value', function () {
    $this->checkbox->uncheckedValue('no');

    expect($this->checkbox->getUncheckedValue())->toBe('no');
});

it('has false as default unchecked value', function () {
    expect($this->checkbox->getUncheckedValue())->toBe(false);
});

it('can set description', function () {
    $this->checkbox->description('This is a description');

    expect($this->checkbox->getDescription())->toBe('This is a description');
});

it('supports closure for description', function () {
    $this->checkbox->description(fn () => 'Dynamic Description');

    expect($this->checkbox->getDescription())->toBe('Dynamic Description');
});

it('supports closure for options', function () {
    $this->checkbox->options(fn () => ['opt1' => 'Option 1', 'opt2' => 'Option 2']);

    expect($this->checkbox->getOptions())->toHaveCount(2)
        ->and($this->checkbox->getOptions()['opt1'])->toBe('Option 1');
});

it('serializes all properties to laravilt props', function () {
    $this->checkbox
        ->options(['opt1' => 'Option 1', 'opt2' => 'Option 2'])
        ->inline()
        ->checkedValue('yes')
        ->uncheckedValue('no')
        ->description('Test Description');

    $props = $this->checkbox->toLaraviltProps();

    expect($props)->toHaveKey('options')
        ->and($props['options'])->toHaveCount(2)
        ->and($props)->toHaveKey('inline')
        ->and($props['inline'])->toBeTrue()
        ->and($props)->toHaveKey('checkedValue')
        ->and($props['checkedValue'])->toBe('yes')
        ->and($props)->toHaveKey('uncheckedValue')
        ->and($props['uncheckedValue'])->toBe('no')
        ->and($props)->toHaveKey('description')
        ->and($props['description'])->toBe('Test Description')
        ->and($props)->toHaveKey('isCheckboxList')
        ->and($props['isCheckboxList'])->toBeTrue();
});

it('supports method chaining', function () {
    $result = $this->checkbox
        ->options(['opt1' => 'Option 1'])
        ->inline()
        ->checkedValue('yes')
        ->uncheckedValue('no');

    expect($result)->toBe($this->checkbox);
});
