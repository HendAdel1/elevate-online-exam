import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavFooter } from './sidenav-footer';

describe('SidenavFooter', () => {
  let component: SidenavFooter;
  let fixture: ComponentFixture<SidenavFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
