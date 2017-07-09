import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./errors/not-found.component";
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";

import { MdButtonModule, MdSliderModule } from "@angular/material";
import { ButtonModule } from "primeng/primeng";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", component: HomeComponent },
            { path: "test", component: TestComponent },
            { path: "**", component: PageNotFoundComponent },
        ]),
        BrowserModule,
        FormsModule,
        HttpModule,
        ButtonModule,
        MdButtonModule,
        MdSliderModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        TestComponent,
        PageNotFoundComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: "ORIGIN_URL", useValue: location.origin },
    ],
})
export class AppModule {}
