import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavNavLinks } from './sidenav-nav-links';

describe('SidenavNavLinks', () => {
  let component: SidenavNavLinks;
  let fixture: ComponentFixture<SidenavNavLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavNavLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavNavLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
