import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ContinentsService } from './../../../services/continents.service';
import { Continent } from './../../../model/continent';

@Component({
  selector: 'app-edit-continent',
  templateUrl: './edit-continent.component.html',
  styleUrls: ['./edit-continent.component.css']
})
export class EditContinentComponent implements OnInit {

  continentId: string;
  continentName: string;
  continentSelected: Continent;

  flagContinent: boolean = false;
  flagError: boolean = false;

  message: string;
  errorMessage: string;

  constructor(private continentsService: ContinentsService,
              private activatedroute:ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.continentId = this.activatedroute.snapshot.params['continentId'];

    let observableGetById = this.continentsService.getContinentById(this.continentId);
    observableGetById.subscribe(
      (data) => { 
        this.continentSelected = data;
        this.continentName = this.continentSelected.name;
      },
      (error) => {
        this.flagError = true;
        this.errorMessage = "An error has ocurred when retrieving the selected continent (" + error.message + ")."
      }
    );

  }

  updateContinent() {
    if (this.continentName == "") {
      this.flagError = true;
      this.errorMessage = "Name is required.";
    }
    else {
      this.flagError = false;

      this.continentSelected.name = this.continentName;

      let observableUpdateContinent = this.continentsService.updateContinent(this.continentSelected);
      observableUpdateContinent.subscribe(
        (data) => { 
          this.router.navigateByUrl("continents");
        },
        (error) => {
          this.flagError = true;
          this.errorMessage = "An error has ocurred when updating the selected continent (" + error.message + ")."
        }
      );      
    }

  }

}
