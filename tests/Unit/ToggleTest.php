<?php

use Laravilt\Forms\Components\Toggle;

beforeEach(function () {
    $this->toggle = Toggle::make('test-toggle');
});

it('can be instantiated with make method', function () {
    $toggle = Toggle::make('test');

    expect($toggle)->toBeInstanceOf(Toggle::class)
        ->and($toggle->getName())->toBe('test');
});

it('has true as default on value', function () {
    expect($this->toggle->getOnValue())->toBe(true);
});

it('has false as default off value', function () {
    expect($this->toggle->getOffValue())->toBe(false);
});

it('can set custom on value', function () {
    $this->toggle->onValue('yes');

    expect($this->toggle->getOnValue())->toBe('yes');
});

it('can set custom off value', function () {
    $this->toggle->offValue('no');

    expect($this->toggle->getOffValue())->toBe('no');
});

it('can set on label', function () {
    $this->toggle->onLabel('Enabled');

    expect($this->toggle->getOnLabel())->toBe('Enabled');
});

it('can set off label', function () {
    $this->toggle->offLabel('Disabled');

    expect($this->toggle->getOffLabel())->toBe('Disabled');
});

it('supports closure for on label', function () {
    $this->toggle->onLabel(fn () => 'Dynamic Enabled');

    expect($this->toggle->getOnLabel())->toBe('Dynamic Enabled');
});

it('supports closure for off label', function () {
    $this->toggle->offLabel(fn () => 'Dynamic Disabled');

    expect($this->toggle->getOffLabel())->toBe('Dynamic Disabled');
});

it('can set on icon', function () {
    $this->toggle->onIcon('heroicon-o-check');

    expect($this->toggle->getOnIcon())->toBe('heroicon-o-check');
});

it('can set off icon', function () {
    $this->toggle->offIcon('heroicon-o-x-mark');

    expect($this->toggle->getOffIcon())->toBe('heroicon-o-x-mark');
});

it('can set on color', function () {
    $this->toggle->onColor('green');

    expect($this->toggle->getOnColor())->toBe('green');
});

it('has primary as default on color', function () {
    expect($this->toggle->getOnColor())->toBe('primary');
});

it('can set off color', function () {
    $this->toggle->offColor('red');

    expect($this->toggle->getOffColor())->toBe('red');
});

it('has gray as default off color', function () {
    expect($this->toggle->getOffColor())->toBe('gray');
});

it('serializes all properties to laravilt props', function () {
    $this->toggle
        ->onValue('active')
        ->offValue('inactive')
        ->onLabel('Active')
        ->offLabel('Inactive')
        ->onIcon('heroicon-o-check')
        ->offIcon('heroicon-o-x-mark')
        ->onColor('green')
        ->offColor('red');

    $props = $this->toggle->toLaraviltProps();

    expect($props)->toHaveKey('onValue')
        ->and($props['onValue'])->toBe('active')
        ->and($props)->toHaveKey('offValue')
        ->and($props['offValue'])->toBe('inactive')
        ->and($props)->toHaveKey('onLabel')
        ->and($props['onLabel'])->toBe('Active')
        ->and($props)->toHaveKey('offLabel')
        ->and($props['offLabel'])->toBe('Inactive')
        ->and($props)->toHaveKey('onIcon')
        ->and($props['onIcon'])->toBe('heroicon-o-check')
        ->and($props)->toHaveKey('offIcon')
        ->and($props['offIcon'])->toBe('heroicon-o-x-mark')
        ->and($props)->toHaveKey('onColor')
        ->and($props['onColor'])->toBe('green')
        ->and($props)->toHaveKey('offColor')
        ->and($props['offColor'])->toBe('red');
});

it('supports method chaining', function () {
    $result = $this->toggle
        ->onValue('yes')
        ->offValue('no')
        ->onLabel('Yes')
        ->offLabel('No');

    expect($result)->toBe($this->toggle);
});
