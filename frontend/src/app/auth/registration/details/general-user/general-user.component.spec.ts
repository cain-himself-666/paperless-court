import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserComponent } from './general-user.component';

describe('GeneralUserComponent', () => {
  let component: GeneralUserComponent;
  let fixture: ComponentFixture<GeneralUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
