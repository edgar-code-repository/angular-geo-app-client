import { Component, OnInit } from '@angular/core';
import { CountriesService } from './../../../services/countries.service';
import { ContinentsService } from './../../../services/continents.service';
import { Router } from '@angular/router';
import { Country } from './../../../model/country';
import { Continent } from './../../../model/continent';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {

  flagError: boolean = false;
  errorMessage: string;
  continentSelected: string;

  continentsList: Continent[];
  newCountry: Country = {
    "id": "",
    "name": "",
    "continent": null
  };

  constructor(private continentsService: ContinentsService, 
              private countriesService: CountriesService, 
              private router: Router) { }

  ngOnInit() {
    let observableContinents = this.continentsService.getAllContinents();
    observableContinents.subscribe(
      (data) => this.continentsList = data,
      (error) => {
        this.flagError = true;
        this.errorMessage = "An error ocurred when retrieving continents (" + error.message + ").";
      }
    );
  }

  createCountry() {
    if (this.newCountry.name == "") {
      this.flagError = true;
      this.errorMessage = "Name is required."
    }
    else {
      if (this.continentSelected == undefined || this.continentSelected == "-1") {
        this.flagError = true;
        this.errorMessage = "Continent is required."
      }
      else {
        this.flagError = false;

        let observableSaveContinent = this.countriesService.saveCountry(this.continentSelected, this.newCountry);
        observableSaveContinent.subscribe(
          (data) => { 
            this.goToRoute("countries");
          },
          (error) => {
            this.flagError = true;
            this.errorMessage = "An error has ocurred when saving the new country (" + error.message + ")."
          }
        ); 
      }
    }

  }

  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }


}
