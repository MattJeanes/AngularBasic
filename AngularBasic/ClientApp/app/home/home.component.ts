import { Component } from "@angular/core";
import { TdDialogService } from "@covalent/core";

@Component({
    templateUrl: "./home.template.html",
    styleUrls: ["./home.style.scss"],
})
export class HomeComponent {
    public appName: string = "My App";
    public count: number = 0;
    constructor(private dialogService: TdDialogService) { }
    public counter(amount: number) {
        this.count += amount;
    }
    public openDialog() {
        const message = `Hello from ${this.appName}`;
        this.dialogService.openAlert({ message });
    }
}
