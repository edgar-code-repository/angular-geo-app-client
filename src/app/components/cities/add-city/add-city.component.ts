import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Country } from './../../../model/country';
import { City } from './../../../model/city';

import { CountriesService } from './../../../services/countries.service';
import { CitiesService } from './../../../services/cities.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  flagError: boolean = false;
  errorMessage: string;
  countrySelected: string;

  countriesList: Country[];
  newCity: City = {
    "id": "",
    "name": "",
    "country": null
  };

  constructor(private countriesService: CountriesService,
              private citiesService: CitiesService,
              private router: Router) { }

  ngOnInit() {
    let observableCountries = this.countriesService.getAllCountries();
    observableCountries.subscribe(
      (data) => this.countriesList = data,
      (error) => {
        this.flagError = true;
        this.errorMessage = "An error ocurred when retrieving countries (" + error.message + ").";
      }
    );
  }

  createCity() {
    if (this.newCity.name == "") {
      this.flagError = true;
      this.errorMessage = "Name is required."
    }
    else {
      if (this.countrySelected == undefined || this.countrySelected == "-1") {
        this.flagError = true;
        this.errorMessage = "Country is required."
      }
      else {
        this.flagError = false;

        let observableSaveCity = this.citiesService.saveCity(this.countrySelected, this.newCity);
        observableSaveCity.subscribe(
          (data) => { 
            this.goToRoute("cities");
          },
          (error) => {
            this.flagError = true;
            this.errorMessage = "An error has ocurred when saving the new city (" + error.message + ")."
          }
        ); 
      }
    }

  }

  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }

}
