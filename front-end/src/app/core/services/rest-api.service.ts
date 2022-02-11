import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // apiUrl = environment.apiUrl; // TODO: check apiurl in other projects
  constructor(private httpClient: HttpClient) {
  }

}
