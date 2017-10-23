/// <reference types="jasmine" />

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material";
import { HomeComponent } from "./home.component";

let fixture: ComponentFixture<HomeComponent>;

describe("Counter component", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [MatButtonModule], declarations: [HomeComponent] });
        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
    });

    it("should display a title", async(() => {
        const titleText = fixture.nativeElement.querySelector("h1").textContent;
        expect(titleText).toEqual("My App");
    }));

    it("should start with count 0, then increments by 1 when clicked", async(() => {
        const countElement = fixture.nativeElement.querySelector("h3");
        expect(countElement.textContent).toEqual("0");

        const incrementButton = fixture.nativeElement.querySelector("button");
        incrementButton.click();
        fixture.detectChanges();
        expect(countElement.textContent).toEqual("1");
    }));
});
