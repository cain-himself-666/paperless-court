import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCalculatorLoaderComponent } from './page-calculator-loader.component';

describe('PageCalculatorLoaderComponent', () => {
  let component: PageCalculatorLoaderComponent;
  let fixture: ComponentFixture<PageCalculatorLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCalculatorLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageCalculatorLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
