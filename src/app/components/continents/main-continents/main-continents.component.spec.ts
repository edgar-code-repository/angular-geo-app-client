import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContinentsComponent } from './main-continents.component';

describe('MainContinentsComponent', () => {
  let component: MainContinentsComponent;
  let fixture: ComponentFixture<MainContinentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContinentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContinentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
