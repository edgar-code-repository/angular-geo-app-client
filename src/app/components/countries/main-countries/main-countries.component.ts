import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CountriesService } from './../../../services/countries.service';
import { Country } from 'src/app/model/country';

@Component({
  selector: 'app-main-countries',
  templateUrl: './main-countries.component.html',
  styleUrls: ['./main-countries.component.css']
})
export class MainCountriesComponent implements OnInit {

  countriesList: Country[];

  flagCountries: boolean = false;
  flagError: boolean = false;

  message: string;
  errorMesage: string;

  constructor(private countriesService: CountriesService,
              private router: Router) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    let observableCountries = this.countriesService.getAllCountries();

    observableCountries.subscribe(
      (data) => {
        this.countriesList = data;
        
        if (this.countriesList.length > 0) {
            this.flagCountries = true;
            this.message = "";
        }
        else {
          this.flagCountries = false;
          this.message = "No records available.";
        }
      },
      (error) => {
        this.errorMesage = "An error ocurred (CountriesService: " + error.message + ").";
        this.flagError = true;
      }
    );
  }

  deleteCountry(countryId: string) {
    const message = "Are you sure you want to delete selected country?";
    if (confirm(message)) {
      let observableDeleteCountry = this.countriesService.deleteCountry(countryId);

      observableDeleteCountry.subscribe(
        (data) => {
          this.loadCountries();
        },
        (error) => {
          this.errorMesage = "An error ocurred (CountriesService: " + error.message + ").";
          this.flagError = true;
        }
      );
    }
  }

  editCountry(countryId: string) {
    this.router.navigateByUrl("editCountry/" + countryId);
  }

}
