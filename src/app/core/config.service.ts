import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@exam-env/environment';
import { Config } from '@exam-domain/config';

@Injectable()
export class ConfigService {

  private config: Config;

  constructor(private http: HttpClient) {
  }

  load(url: string) {
    return new Promise((resolve) => {
      this.http.get<Config>(url).subscribe(config => {
        this.config = config;
        resolve();
      });
    });
  }

  getConfiguration(): Config {
    return this.config;
  }
}

export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  return () => configService.load(environment.configFile);
}
