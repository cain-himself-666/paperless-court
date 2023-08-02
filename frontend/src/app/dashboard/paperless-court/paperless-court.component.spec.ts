import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperlessCourtComponent } from './paperless-court.component';

describe('PaperlessCourtComponent', () => {
  let component: PaperlessCourtComponent;
  let fixture: ComponentFixture<PaperlessCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperlessCourtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperlessCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
