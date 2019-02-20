import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavigationLayoutComponent } from './left-navigation-layout.component';

describe('LeftNavigationLayoutComponent', () => {
  let component: LeftNavigationLayoutComponent;
  let fixture: ComponentFixture<LeftNavigationLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftNavigationLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavigationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
