import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Continent } from './../model/continent';

@Injectable({
  providedIn: 'root'
})
export class ContinentsService {

  private apiUrl = "http://localhost:5501/continents";

  private httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  };

  constructor(private httpClient:HttpClient) {
  }

  public getAllContinents(): Observable<Continent[]> {
    let observable = this.httpClient.get<Continent[]>(this.apiUrl, this.httpOptions);
    return observable;
  }

  public getContinentById(continentId: string): Observable<Continent> {
    const apiUrlGetById = this.apiUrl + "/" + continentId;
    let observable = this.httpClient.get<Continent>(apiUrlGetById, this.httpOptions);
    return observable;
  }

  public saveContinent(newContinent: Continent) {
    let observable = this.httpClient.post<Continent>(this.apiUrl, newContinent, this.httpOptions);
    return observable;
  }

  public updateContinent(continent: Continent) {
    const apiUrlUpdate = this.apiUrl + "/" + continent.id;
    let observable = this.httpClient.put<Continent>(apiUrlUpdate, continent, this.httpOptions);
    return observable;
  }

  public deleteContinent(continentId: string) {
    const apiUrlDelete = this.apiUrl + "/" + continentId;
    
    let observable = this.httpClient.delete(apiUrlDelete, this.httpOptions);
    return observable;
  }
  

}
