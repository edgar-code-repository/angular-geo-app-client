import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContinentsService } from './../../../services/continents.service';
import { Continent } from './../../../model/continent';

@Component({
  selector: 'app-main-continents',
  templateUrl: './main-continents.component.html',
  styleUrls: ['./main-continents.component.css']
})
export class MainContinentsComponent implements OnInit {

  continentsList: Continent[];

  flagContinents: boolean = false;
  flagError: boolean = false;

  message: string;
  errorMesage: string;

  constructor(private continentsService: ContinentsService,
              private router: Router) { }

  ngOnInit() {
    this.loadContinents();
  }

  loadContinents() {
    let observableContinents = this.continentsService.getAllContinents();

    observableContinents.subscribe(
      (data) => {
        this.continentsList = data;
        
        if (this.continentsList.length > 0) {
            this.flagContinents = true;
            this.message = "";
        }
        else {
          this.flagContinents = false;
          this.message = "No records available.";
        }
      },
      (error) => {
        this.errorMesage = "An error ocurred (ContinentsService: " + error.message + ").";
        this.flagError = true;
      }
    );

  }

  deleteContinent(continentId: string) {
    console.log("deleteContinent - Continent Id: " + continentId);
    const message = "Are you sure you want to delete selected continent?";
    if (confirm(message)) {
      let observableDeleteContinent = this.continentsService.deleteContinent(continentId);

      observableDeleteContinent.subscribe(
        (data) => {
          this.loadContinents();
        },
        (error) => {
          this.errorMesage = "An error ocurred (ContinentsService: " + error.message + ").";
          this.flagError = true;
        }
      );
    }
  }

  editContinent(continentId: string) {
    this.router.navigateByUrl("editContinent/" + continentId);
  }


}

