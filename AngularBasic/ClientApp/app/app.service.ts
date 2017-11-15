import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    constructor(private httpClient: HttpClient) { }
    public async getValues() {
        return this.httpClient.get<string[]>("/api/values").toPromise();
    }
}
