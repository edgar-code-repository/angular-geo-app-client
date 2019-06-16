import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl = "http://localhost:5501";

  private httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  };

  constructor(private httpClient:HttpClient) { 
  }

  public getAllCountries(): Observable<Country[]> {
    let apiUrlGetAllCountries = this.apiUrl + "/countries"; 
    let observable = this.httpClient.get<Country[]>(apiUrlGetAllCountries, this.httpOptions);
    return observable;
  }

  public getCountryById(countryId: string): Observable<Country> {
    const apiUrlGetById = this.apiUrl + "/countries/" + countryId;
    let observable = this.httpClient.get<Country>(apiUrlGetById, this.httpOptions);
    return observable;
  }

  public saveCountry(continentId: string, newCountry: Country) {
    let apiUrlSaveCountry = this.apiUrl + "/continents/" + continentId + "/countries"; 
    let observable = this.httpClient.post<Country>(apiUrlSaveCountry, newCountry, this.httpOptions);
    return observable;
  }

  public updateCountry(continentId: string, country: Country) {
    const apiUrlUpdate = this.apiUrl + "/continents/" + continentId + "/countries/" + country.id;
    let observable = this.httpClient.put<Country>(apiUrlUpdate, country, this.httpOptions);
    return observable;
  }

  public deleteCountry(countryId: string) {
    const apiUrlDelete = this.apiUrl + "/countries/" + countryId;
    let observable = this.httpClient.delete(apiUrlDelete, this.httpOptions);
    return observable;
  }

}
