import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCitiesComponent } from './main-cities.component';

describe('MainCitiesComponent', () => {
  let component: MainCitiesComponent;
  let fixture: ComponentFixture<MainCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
