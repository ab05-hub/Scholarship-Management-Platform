import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewscholarshipComponent } from './viewscholarship.component';

describe('ViewscholarshipComponent', () => {
  let component: ViewscholarshipComponent;
  let fixture: ComponentFixture<ViewscholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewscholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewscholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
