import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http:HttpClient) { }

  getStats():Observable<any> {
     return this.http.get(BASIC_URL + "/stats")
  }
  getChart():Observable<any> {
     return this.http.get(BASIC_URL + "/stats/chart")
  }


}
