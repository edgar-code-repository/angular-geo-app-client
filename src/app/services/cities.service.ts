import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private apiBaseUrl = "http://localhost:5501";

  private httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  };

  constructor(private httpClient:HttpClient) { 
  }

  getAllCities(): Observable<City[]> {
    const apiUrlGetAllCities = this.apiBaseUrl + "/cities";
    let observable = this.httpClient.get<City[]>(apiUrlGetAllCities, this.httpOptions);
    return observable;
  }

  public getCityById(cityId: string): Observable<City> {
    const apiUrlGetById = this.apiBaseUrl + "/cities/" + cityId;
    let observable = this.httpClient.get<City>(apiUrlGetById, this.httpOptions);
    return observable;
  }

  public saveCity(countryId: string, newCity: City) {
    const apiUrlSaveCity = this.apiBaseUrl + "/countries/" + countryId + "/cities"; 
    let observable = this.httpClient.post<City>(apiUrlSaveCity, newCity, this.httpOptions);
    return observable;
  }

  public updateCity(countryId: string, city: City) {
    const apiUrlUpdate = this.apiBaseUrl + "/countries/" + countryId + "/cities/" + city.id;
    let observable = this.httpClient.put<City>(apiUrlUpdate, city, this.httpOptions);
    return observable;
  }

  public deleteCity(cityId: string) {
    const apiUrlDelete = this.apiBaseUrl + "/cities/" + cityId;
    let observable = this.httpClient.delete(apiUrlDelete, this.httpOptions);
    return observable;
  }

}
