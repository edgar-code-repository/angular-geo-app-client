import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Continent } from './../../../model/continent';
import { Country } from './../../../model/country';
import { CountriesService } from './../../../services/countries.service';
import { ContinentsService } from 'src/app/services/continents.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit {

  continentId: string;
  countryId: string;
  countryName: string;
  countrySelected: Country;
  continentSelected: string;
  continentsList: Continent[];

  flagCountry: boolean = false;
  flagError: boolean = false;

  message: string;
  errorMessage: string;

  constructor(private continentsService: ContinentsService,
              private countriesService: CountriesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let observableGetContinents = this.continentsService.getAllContinents();
    observableGetContinents.subscribe(
      (data) => { 
        this.continentsList = data;
      },
      (error) => {
        this.flagError = true;
        this.errorMessage = "An error has ocurred when retrieving list of continents (" + error.message + ")."
      }
    );

    this.countryId = this.activatedRoute.snapshot.params['countryId'];

    let observableGetById = this.countriesService.getCountryById(this.countryId);
    observableGetById.subscribe(
      (data) => { 
        this.countrySelected = data;
        this.countryName = this.countrySelected.name;
        this.continentSelected = this.countrySelected.continent.id;
      },
      (error) => {
        this.flagError = true;
        this.errorMessage = "An error has ocurred when retrieving the selected country (" + error.message + ")."
      }
    );
  }

  updateCountry() {
    if (this.countryName == "") {
      this.flagError = true;
      this.errorMessage = "Name is required."
    }
    else {
      this.countrySelected.name = this.countryName;

      if (this.continentSelected == undefined || this.continentSelected == "-1") {
        this.flagError = true;
        this.errorMessage = "Continent is required."
      }
      else {
        this.flagError = false;
        let continent: Continent;
        continent = this.continentsList.find(c => c.id == this.continentSelected);
        this.countrySelected.continent = continent;

        let observableUpdateCountry = this.countriesService.updateCountry(this.continentSelected, this.countrySelected);
        observableUpdateCountry.subscribe(
          (data) => { 
            this.router.navigateByUrl('countries');
          },
          (error) => {
            this.flagError = true;
            this.errorMessage = "An error has ocurred when updating the country (" + error.message + ")."
          }
        ); 
      }
    }    
  }


}
