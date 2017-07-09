import { Component } from "@angular/core";<% if(covalent) { %>
import { TdDialogService } from "@covalent/core";<% } %>

@Component({
    templateUrl: "./home.template.html",
    styleUrls: ["./home.style.scss"],
})
export class HomeComponent {
    public appName: string = "<%= appName %>";
    public count: number = 0;<% if(covalent) { %>
    constructor(private dialogService: TdDialogService) { }<% } %>
    public counter(amount: number) {
        this.count += amount;
    }
    public openDialog() {
        const message = `Hello from ${this.appName}`;
        <% if (covalent) { %>this.dialogService.openAlert({message})<% } else { %>alert(message)<% } %>;
    }
}
