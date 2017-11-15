import { Component, OnInit } from "@angular/core";<% if(covalent) { %>
import { TdDialogService } from "@covalent/core";<% } %>
import { AppService } from "../app.service";

@Component({
    templateUrl: "./home.template.html",
    styleUrls: ["./home.style.scss"],
})
export class HomeComponent implements OnInit {
    public appName: string = "<%= appName %>";
    public count: number = 0;
    public values: string[] = [];
    constructor(<% if(covalent) { %>private dialogService: TdDialogService, <% } %>private appService: AppService) { }
    public async ngOnInit() {
        await this.updateValues();
    }
    public counter(amount: number) {
        this.count += amount;
    }
    public openDialog() {
        const message = `Hello from ${this.appName}`;
        <% if (covalent) { %>this.dialogService.openAlert({message})<% } else { %>alert(message)<% } %>;
    }
    public async updateValues() {
        this.values = ["Loading"];
        this.values = await this.appService.getValues();
    }
}
