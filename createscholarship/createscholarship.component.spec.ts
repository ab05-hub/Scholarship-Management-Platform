import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatescholarshipComponent } from './createscholarship.component';

describe('CreatescholarshipComponent', () => {
  let component: CreatescholarshipComponent;
  let fixture: ComponentFixture<CreatescholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatescholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatescholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
