// Load required polyfills and testing libraries

import "reflect-metadata";

import "zone.js";

import "zone.js/dist/long-stack-trace-zone";

import "zone.js/dist/async-test";

import "zone.js/dist/fake-async-test";

import "zone.js/dist/sync-test";

import "zone.js/dist/proxy";

import "zone.js/dist/jasmine-patch";

import * as testing from "@angular/core/testing";
import * as testingBrowser from "@angular/platform-browser-dynamic/testing";

// There's no typing for the `__karma__` variable. Just declare it as any
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely
// tslint:disable-next-line:no-empty
__karma__.loaded = () => {};

// First, initialize the Angular testing environment
testing.getTestBed().initTestEnvironment(
    testingBrowser.BrowserDynamicTestingModule,
    testingBrowser.platformBrowserDynamicTesting(),
);

// Then we find all the tests
const context = require.context("../", true, /\.spec\.ts$/);

// And load the modules
context.keys().map(context);

// Finally, start Karma to run the tests
__karma__.start();
