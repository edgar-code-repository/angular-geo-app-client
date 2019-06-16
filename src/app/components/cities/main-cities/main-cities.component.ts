import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { City } from 'src/app/model/city';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-main-cities',
  templateUrl: './main-cities.component.html',
  styleUrls: ['./main-cities.component.css']
})
export class MainCitiesComponent implements OnInit {

  citiesList: City[];

  flagCities: boolean = false;
  flagError: boolean = false;

  message: string;
  errorMesage: string;

  constructor(private citiesService: CitiesService,
              private router: Router) { }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    let observableCities = this.citiesService.getAllCities();

    observableCities.subscribe(
      (data) => {
        this.citiesList = data;
        
        if (this.citiesList.length > 0) {
            this.flagCities = true;
            this.message = "";
        }
        else {
          this.flagCities = false;
          this.message = "No records available.";
        }
      },
      (error) => {
        this.errorMesage = "An error ocurred (CitiesService: " + error.message + ").";
        this.flagError = true;
      }
    );
  }

  editCity(cityId: string) {
    this.router.navigateByUrl("editCity/" + cityId);
  }

  deleteCity(cityId: string) {
    const message = "Are you sure you want to delete selected city?";
    if (confirm(message)) {
      let observableDeleteCity = this.citiesService.deleteCity(cityId);

      observableDeleteCity.subscribe(
        (data) => {
          this.loadCities();
        },
        (error) => {
          this.errorMesage = "An error ocurred (CitiesService: " + error.message + ").";
          this.flagError = true;
        }
      );
    }
  }

}

