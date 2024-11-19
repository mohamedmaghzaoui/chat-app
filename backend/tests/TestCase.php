<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Force the SQLite in-memory configuration
        config(['database.default' => 'sqlite']);
        config(['database.connections.sqlite.database' => '/var/www/database/database_test.sqlite']);
    }
}
