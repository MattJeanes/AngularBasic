import { Component } from '@angular/core';
import template from './test.template.html';

@Component({
    moduleId: module.id,
    template: template
})
export class TestComponent {
    test: string = "Test Page";
}