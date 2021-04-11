import { Component, OnInit } from '@angular/core';
import { ContinentsService } from './../../../services/continents.service';
import { Router } from '@angular/router';
import { Continent} from './../../../model/continent';

@Component({
  selector: 'app-add-continent',
  templateUrl: './add-continent.component.html',
  styleUrls: ['./add-continent.component.css']
})
export class AddContinentComponent implements OnInit {

  flagError: boolean = false;
  errorMessage: string;
  newContinent: Continent = {
    "id": null,
    "name": ""
  };

  constructor(private continentsService: ContinentsService, private router: Router) { }

  ngOnInit() {
  }

  createContinent() {
    if (this.newContinent.name == "") {
      this.flagError = true;
      this.errorMessage = "Name is required."
    }
    else {
      this.flagError = false;

      let observableSaveContinent = this.continentsService.saveContinent(this.newContinent);
      observableSaveContinent.subscribe(
        (data) => { 
          this.goToRoute("continents");
        },
        (error) => {
          this.flagError = true;
          this.errorMessage = "An error has ocurred when saving the new continent (" + error.message + ")."
        }
      ); 
    }
  }

  goToRoute(strRouteParam: string) {
    this.router.navigateByUrl(strRouteParam);
  }

}

