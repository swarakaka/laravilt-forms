<?php

use Laravilt\Forms\Components\Textarea;

beforeEach(function () {
    $this->textarea = Textarea::make('test-textarea');
});

it('can be instantiated with make method', function () {
    $textarea = Textarea::make('test');

    expect($textarea)->toBeInstanceOf(Textarea::class)
        ->and($textarea->getName())->toBe('test');
});

it('has default 3 rows', function () {
    expect($this->textarea->getRows())->toBe(3);
});

it('can set rows', function () {
    $this->textarea->rows(5);

    expect($this->textarea->getRows())->toBe(5);
});

it('can set min rows', function () {
    $this->textarea->minRows(2);

    expect($this->textarea->getMinRows())->toBe(2)
        ->and($this->textarea->shouldAutosize())->toBeTrue();
});

it('can set max rows', function () {
    $this->textarea->maxRows(10);

    expect($this->textarea->getMaxRows())->toBe(10)
        ->and($this->textarea->shouldAutosize())->toBeTrue();
});

it('can enable autosize', function () {
    $this->textarea->autosize();

    expect($this->textarea->shouldAutosize())->toBeTrue();
});

it('is not autosized by default', function () {
    expect($this->textarea->shouldAutosize())->toBeFalse();
});

it('can set max length', function () {
    $this->textarea->maxLength(500);

    expect($this->textarea->getMaxLength())->toBe(500);
});

it('can enable character count', function () {
    $this->textarea->characterCount();

    expect($this->textarea->shouldShowCharacterCount())->toBeTrue();
});

it('can enable character count with alias', function () {
    $this->textarea->showCharacterCount();

    expect($this->textarea->shouldShowCharacterCount())->toBeTrue();
});

it('does not show character count by default', function () {
    expect($this->textarea->shouldShowCharacterCount())->toBeFalse();
});

it('can enable word count', function () {
    $this->textarea->wordCount();

    expect($this->textarea->shouldShowWordCount())->toBeTrue();
});

it('can enable word count with alias', function () {
    $this->textarea->showWordCount();

    expect($this->textarea->shouldShowWordCount())->toBeTrue();
});

it('does not show word count by default', function () {
    expect($this->textarea->shouldShowWordCount())->toBeFalse();
});

it('serializes all properties to laravilt props', function () {
    $this->textarea
        ->rows(5)
        ->minRows(2)
        ->maxRows(10)
        ->maxLength(1000)
        ->characterCount()
        ->wordCount();

    $props = $this->textarea->toLaraviltProps();

    expect($props)->toHaveKey('rows')
        ->and($props['rows'])->toBe(5)
        ->and($props)->toHaveKey('minRows')
        ->and($props['minRows'])->toBe(2)
        ->and($props)->toHaveKey('maxRows')
        ->and($props['maxRows'])->toBe(10)
        ->and($props)->toHaveKey('autosize')
        ->and($props['autosize'])->toBeTrue()
        ->and($props)->toHaveKey('maxLength')
        ->and($props['maxLength'])->toBe(1000)
        ->and($props)->toHaveKey('showCharacterCount')
        ->and($props['showCharacterCount'])->toBeTrue()
        ->and($props)->toHaveKey('showWordCount')
        ->and($props['showWordCount'])->toBeTrue();
});

it('supports method chaining', function () {
    $result = $this->textarea
        ->rows(5)
        ->minRows(2)
        ->maxRows(10)
        ->characterCount()
        ->wordCount();

    expect($result)->toBe($this->textarea);
});
