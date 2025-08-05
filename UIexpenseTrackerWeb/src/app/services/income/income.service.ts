import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http:HttpClient) { }

   postIncome(incomeDTO: any): Observable<any> {
   return this.http.post(BASIC_URL + "/income" , incomeDTO );
  }

  getAllIncomes(): Observable<any> {
     return this.http.get(BASIC_URL + "/income/all");
  }

  getIncomeById(id: number): Observable<any> {
     return this.http.get(BASIC_URL + `/income/${id}`);
  }

   updateIncome(id: number , incomeDTO : any): Observable<any> {
     return this.http.put(BASIC_URL + `/income/${id}`, incomeDTO);
  }

   deleteIncome(id: number): Observable<any> {
     return this.http.delete(BASIC_URL + `/income/${id}`);
  }

}
