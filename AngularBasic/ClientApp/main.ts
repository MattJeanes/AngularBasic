// Main

import * as Pace from "pace-progress";

Pace.start();

import "./polyfills";

import "hammerjs";

// import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic().bootstrapModule(AppModule);
