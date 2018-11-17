import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDropdownMenuComponent } from './header-dropdown-menu.component';

describe('HeaderDropdownMenuComponent', () => {
  let component: HeaderDropdownMenuComponent;
  let fixture: ComponentFixture<HeaderDropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderDropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
