<?php

use Laravilt\Forms\Components\TextInput;

beforeEach(function () {
    $this->input = TextInput::make('test-input');
});

it('can be instantiated with make method', function () {
    $input = TextInput::make('test');

    expect($input)->toBeInstanceOf(TextInput::class)
        ->and($input->getName())->toBe('test');
});

it('has default text type', function () {
    expect($this->input->getType())->toBe('text');
});

it('can set input type', function () {
    $this->input->type('email');

    expect($this->input->getType())->toBe('email');
});

it('can set type to email with autocomplete', function () {
    $this->input->email();

    expect($this->input->getType())->toBe('email')
        ->and($this->input->getAutocomplete())->toBe('email');
});

it('can set type to password with autocomplete', function () {
    $this->input->password();

    expect($this->input->getType())->toBe('password')
        ->and($this->input->getAutocomplete())->toBe('current-password');
});

it('can set type to tel with autocomplete', function () {
    $this->input->tel();

    expect($this->input->getType())->toBe('tel')
        ->and($this->input->getAutocomplete())->toBe('tel');
});

it('can set type to url with autocomplete', function () {
    $this->input->url();

    expect($this->input->getType())->toBe('url')
        ->and($this->input->getAutocomplete())->toBe('url');
});

it('can set type to search', function () {
    $this->input->search();

    expect($this->input->getType())->toBe('search');
});

it('can set prefix icon', function () {
    $this->input->prefixIcon('heroicon-o-user');

    expect($this->input->getPrefixIcon())->toBe('heroicon-o-user');
});

it('can set suffix icon', function () {
    $this->input->suffixIcon('heroicon-o-envelope');

    expect($this->input->getSuffixIcon())->toBe('heroicon-o-envelope');
});

it('can set prefix text', function () {
    $this->input->prefix('https://');

    expect($this->input->getPrefixText())->toBe('https://');
});

it('can set suffix text', function () {
    $this->input->suffix('.com');

    expect($this->input->getSuffixText())->toBe('.com');
});

it('can set min length', function () {
    $this->input->minLength(5);

    expect($this->input->getMinLength())->toBe(5);
});

it('can set max length', function () {
    $this->input->maxLength(100);

    expect($this->input->getMaxLength())->toBe(100);
});

it('can set pattern', function () {
    $this->input->pattern('[A-Z]{3}');

    expect($this->input->getPattern())->toBe('[A-Z]{3}');
});

it('can set input mask', function () {
    $this->input->mask('999-999-9999');

    expect($this->input->getMask())->toBe('999-999-9999');
});

it('can enable character count', function () {
    $this->input->characterCount();

    expect($this->input->shouldShowCharacterCount())->toBeTrue();
});

it('does not show character count by default', function () {
    expect($this->input->shouldShowCharacterCount())->toBeFalse();
});

it('serializes all properties to laravilt props', function () {
    $this->input
        ->type('email')
        ->prefixIcon('heroicon-o-envelope')
        ->suffixIcon('heroicon-o-check')
        ->prefix('Email:')
        ->suffix('@example.com')
        ->minLength(5)
        ->maxLength(100)
        ->pattern('[a-z]+')
        ->mask('****')
        ->characterCount();

    $props = $this->input->toLaraviltProps();

    expect($props)->toHaveKey('type')
        ->and($props['type'])->toBe('email')
        ->and($props)->toHaveKey('prefixIcon')
        ->and($props['prefixIcon'])->toBe('heroicon-o-envelope')
        ->and($props)->toHaveKey('suffixIcon')
        ->and($props['suffixIcon'])->toBe('heroicon-o-check')
        ->and($props)->toHaveKey('prefixText')
        ->and($props['prefixText'])->toBe('Email:')
        ->and($props)->toHaveKey('suffixText')
        ->and($props['suffixText'])->toBe('@example.com')
        ->and($props)->toHaveKey('minLength')
        ->and($props['minLength'])->toBe(5)
        ->and($props)->toHaveKey('maxLength')
        ->and($props['maxLength'])->toBe(100)
        ->and($props)->toHaveKey('pattern')
        ->and($props['pattern'])->toBe('[a-z]+')
        ->and($props)->toHaveKey('mask')
        ->and($props['mask'])->toBe('****')
        ->and($props)->toHaveKey('showCharacterCount')
        ->and($props['showCharacterCount'])->toBeTrue();
});

it('supports method chaining', function () {
    $result = $this->input
        ->type('email')
        ->prefixIcon('test')
        ->minLength(5)
        ->maxLength(100);

    expect($result)->toBe($this->input);
});
