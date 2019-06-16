import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContinentComponent } from './edit-continent.component';

describe('EditContinentComponent', () => {
  let component: EditContinentComponent;
  let fixture: ComponentFixture<EditContinentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContinentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContinentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
