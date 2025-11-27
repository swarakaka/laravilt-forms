<?php

use Laravilt\Forms\Components\Field;
use Laravilt\Forms\Tests\TestCase;

uses(TestCase::class)->in(__DIR__);

/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
*/

// Helper function to create test field components
function createTestField(string $name): Field
{
    return new class($name) extends Field
    {
        protected string $view = 'test-view';

        public function __construct(string $name)
        {
            $this->name = $name;
            $this->setUp();
        }
    };
}
