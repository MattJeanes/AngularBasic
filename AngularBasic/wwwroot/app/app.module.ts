import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './errors/not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        BrowserModule
    ],
    declarations: [
        AppComponent,

        HomeComponent,
        PageNotFoundComponent,
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
