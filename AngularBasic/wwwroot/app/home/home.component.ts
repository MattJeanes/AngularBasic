import { Component } from '@angular/core';


@Component({
    moduleId: module.id,
    templateUrl: 'home.template.html',
    styleUrls: ['home.style.css']
})
export class HomeComponent {
    appName: string = "<%= appName %>";
    public func() {
        alert(`Hello from ${this.appName}`);
    }
}