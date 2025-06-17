import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditscholarshipComponent } from './admineditscholarship.component';

describe('AdmineditscholarshipComponent', () => {
  let component: AdmineditscholarshipComponent;
  let fixture: ComponentFixture<AdmineditscholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditscholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmineditscholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
