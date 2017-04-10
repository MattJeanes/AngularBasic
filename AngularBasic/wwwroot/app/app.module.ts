import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './errors/not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'test', component: TestComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,

        HomeComponent,
        TestComponent,
        PageNotFoundComponent,
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
