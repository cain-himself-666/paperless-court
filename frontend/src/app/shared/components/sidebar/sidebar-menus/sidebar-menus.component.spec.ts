import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMenusComponent } from './sidebar-menus.component';

describe('SidebarMenusComponent', () => {
  let component: SidebarMenusComponent;
  let fixture: ComponentFixture<SidebarMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
