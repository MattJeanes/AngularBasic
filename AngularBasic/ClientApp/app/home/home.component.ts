import { Component, OnInit } from "@angular/core";
import { TdDialogService } from "@covalent/core";
import { AppService } from "../app.service";

@Component({
    templateUrl: "./home.template.html",
    styleUrls: ["./home.style.scss"],
})
export class HomeComponent implements OnInit {
    public appName: string = "My App";
    public count: number = 0;
    public values: string[] = [];
    constructor(private dialogService: TdDialogService, private appService: AppService) { }
    public async ngOnInit() {
        await this.updateValues();
    }
    public counter(amount: number) {
        this.count += amount;
    }
    public openDialog() {
        const message = `Hello from ${this.appName}`;
        this.dialogService.openAlert({ message });
    }
    public async updateValues() {
        this.values = ["Loading"];
        this.values = await this.appService.getValues();
    }
}
