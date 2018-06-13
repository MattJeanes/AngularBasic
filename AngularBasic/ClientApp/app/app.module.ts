import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { PageNotFoundComponent } from "./errors/not-found.component";
import { HomeComponent } from "./home/home.component";

import { MatButtonModule, MatSliderModule } from "@angular/material";

import { ButtonModule } from "primeng/primeng";

import { CovalentDialogsModule } from "@covalent/core";

export const ROUTES: Routes = [
    { path: "", component: HomeComponent },
    { path: "test", loadChildren: "./test/test.module#TestModule" },
    { path: "**", component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ButtonModule,
        MatButtonModule,
        MatSliderModule,
        CovalentDialogsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        AppService,
    ],
})
export class AppModule { }
