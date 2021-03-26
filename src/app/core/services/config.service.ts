import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Config } from "../model/config";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  constructor(private storage: StorageService) {}

  saveConfig(config: Config): Observable<Config> {
    return this.storage.saveConfig(config);
  }

  getConfig(): Observable<Config> {
    return this.storage.getConfig();
  }
}
