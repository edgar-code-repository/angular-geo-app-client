import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { City } from './../../../model/city';
import { Country } from './../../../model/country';

import { CitiesService } from './../../../services/cities.service';
import { CountriesService } from './../../../services/countries.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css']
})
export class EditCityComponent implements OnInit {

  cityId: string;
  countryId: string;
  cityName: string;
  citySelected: City;
  countrySelected: string;
  countriesList: Country[];

  flagCity: boolean = false;
  flagError: boolean = false;

  message: string;
  errorMessage: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private countriesService: CountriesService,
              private citiesService: CitiesService) { }

  ngOnInit() {
    let observableGetCountries = this.countriesService.getAllCountries();
    observableGetCountries.subscribe(
      (data) => { 
        this.countriesList = data;
      },
      (error) => {
        this.flagError = true;
        this.errorMessage = "An error has ocurred when retrieving list of countries (" + error.message + ")."
      }
    );

    this.cityId = this.activatedRoute.snapshot.params['cityId'];

    let observableGetById = this.citiesService.getCityById(this.cityId);
    observableGetById.subscribe(
      (data) => { 
        this.citySelected = data;
        this.cityName = this.citySelected.name;
        this.countrySelected = this.citySelected.country.id;
      },
      (error) => {
        this.flagError = true;
        this.errorMessage = "An error has ocurred when retrieving the selected city (" + error.message + ")."
      }
    );
  }

  updateCity() {
    if (this.cityName == "") {
      this.flagError = true;
      this.errorMessage = "Name is required."
    }
    else {
      this.citySelected.name = this.cityName;

      if (this.countrySelected == undefined || this.countrySelected == "-1") {
        this.flagError = true;
        this.errorMessage = "Country is required."
      }
      else {
        this.flagError = false;
        let country: Country;
        country = this.countriesList.find(c => c.id == this.countrySelected);
        this.citySelected.country = country;

        let observableUpdateCountry = this.citiesService.updateCity(this.countrySelected, this.citySelected);
        observableUpdateCountry.subscribe(
          (data) => { 
            this.router.navigateByUrl('cities');
          },
          (error) => {
            this.flagError = true;
            this.errorMessage = "An error has ocurred when updating the city (" + error.message + ")."
          }
        ); 
      }
    } 
  }

}
