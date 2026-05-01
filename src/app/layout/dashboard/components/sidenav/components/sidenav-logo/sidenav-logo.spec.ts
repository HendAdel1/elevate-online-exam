import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLogo } from './sidenav-logo';

describe('SidenavLogo', () => {
  let component: SidenavLogo;
  let fixture: ComponentFixture<SidenavLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavLogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavLogo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
