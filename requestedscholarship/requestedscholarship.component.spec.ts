import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedscholarshipComponent } from './requestedscholarship.component';

describe('RequestedscholarshipComponent', () => {
  let component: RequestedscholarshipComponent;
  let fixture: ComponentFixture<RequestedscholarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedscholarshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedscholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
