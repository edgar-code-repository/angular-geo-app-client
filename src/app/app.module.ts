import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContinentsComponent } from './components/continents/main-continents/main-continents.component';
import { AddContinentComponent } from './components/continents/add-continent/add-continent.component';
import { EditContinentComponent } from './components/continents/edit-continent/edit-continent.component';
import { MainCountriesComponent } from './components/countries/main-countries/main-countries.component';
import { AddCountryComponent } from './components/countries/add-country/add-country.component';
import { EditCountryComponent } from './components/countries/edit-country/edit-country.component';
import { MainCitiesComponent } from './components/cities/main-cities/main-cities.component';
import { AddCityComponent } from './components/cities/add-city/add-city.component';
import { EditCityComponent } from './components/cities/edit-city/edit-city.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MainContinentsComponent,
    AddContinentComponent,
    EditContinentComponent,
    MainCountriesComponent,
    AddCountryComponent,
    EditCountryComponent,
    MainCitiesComponent,
    AddCityComponent,
    EditCityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
