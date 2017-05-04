import { Component } from '@angular/core';


@Component({
    moduleId: module.id,
    templateUrl: 'home.template.html'
})
export class HomeComponent {
    test: string = "My App";
    public func() {
        alert(`Hello from ${this.test}`);
    }
}