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
    public popup() {
        this.dialogService.openAlert({
            message: "Test",
            title: "Angular Basic"
        });
    }
}
