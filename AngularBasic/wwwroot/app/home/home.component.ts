import { Component } from '@angular/core';
import template from './home.template.html';
import style from './home.style.css';

@Component({
    moduleId: module.id,
    template: template,
    styles: [style]
})
export class HomeComponent {
    appName: string = "My App";
    public func() {
        alert(`Hello from ${this.appName}`);
    }
}