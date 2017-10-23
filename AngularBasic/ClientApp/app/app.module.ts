import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./errors/not-found.component";
import { HomeComponent } from "./home/home.component";
import { TestComponent } from "./test/test.component";<% if(material) { %>

import { MdButtonModule, MdSliderModule } from "@angular/material";<% } if(primeng) { %>

import { ButtonModule } from "primeng/primeng";<% } if(covalent) { %>

import { CovalentDialogsModule } from "@covalent/core";<% } %>

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", component: HomeComponent },
            { path: "test", component: TestComponent },
            { path: "**", component: PageNotFoundComponent },
        ]),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,<% if(primeng) { %>
        ButtonModule,<% } if (material) { %>
        MdButtonModule,
        MdSliderModule,<% } if (covalent) { %>
        CovalentDialogsModule,<% } %>
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
export class AppModule { }
