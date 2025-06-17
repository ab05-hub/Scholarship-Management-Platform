import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewscholarshipComponent } from './userviewscholarship.component';

describe('UserviewscholarshipComponent', () => {
  let component: UserviewscholarshipComponent;
  let fixture: ComponentFixture<UserviewscholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewscholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserviewscholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
