import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { MainContinentsComponent } from './components/continents/main-continents/main-continents.component';
import { MainCountriesComponent } from './components/countries/main-countries/main-countries.component';
import { MainCitiesComponent } from './components/cities/main-cities/main-cities.component';

import { AddContinentComponent } from './components/continents/add-continent/add-continent.component';
import { AddCountryComponent } from './components/countries/add-country/add-country.component';
import { AddCityComponent } from './components/cities/add-city/add-city.component';

import { EditContinentComponent } from './components/continents/edit-continent/edit-continent.component';
import { EditCountryComponent } from './components/countries/edit-country/edit-country.component';
import { EditCityComponent } from './components/cities/edit-city/edit-city.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "continents", component: MainContinentsComponent },
  { path: "addContinent", component: AddContinentComponent },
  { path: "editContinent/:continentId", component: EditContinentComponent },
  { path: "countries", component: MainCountriesComponent },
  { path: "addCountry", component: AddCountryComponent },
  { path: "editCountry/:countryId", component: EditCountryComponent },
  { path: "cities", component: MainCitiesComponent },
  { path: "addCity", component: AddCityComponent },
  { path: "editCity/:cityId", component: EditCityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
