import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLayout } from './sidenav-layout';

describe('SidenavLayout', () => {
  let component: SidenavLayout;
  let fixture: ComponentFixture<SidenavLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
