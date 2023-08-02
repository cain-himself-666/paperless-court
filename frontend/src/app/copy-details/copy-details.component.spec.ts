import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyDetailsComponent } from './copy-details.component';

describe('CopyDetailsComponent', () => {
  let component: CopyDetailsComponent;
  let fixture: ComponentFixture<CopyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
