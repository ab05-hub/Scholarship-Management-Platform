import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappliedscholarshipComponent } from './userappliedscholarship.component';

describe('UserappliedscholarshipComponent', () => {
  let component: UserappliedscholarshipComponent;
  let fixture: ComponentFixture<UserappliedscholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserappliedscholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserappliedscholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
