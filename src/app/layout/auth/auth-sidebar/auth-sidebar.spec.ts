import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSidebar } from './auth-sidebar';

describe('AuthSidebar', () => {
  let component: AuthSidebar;
  let fixture: ComponentFixture<AuthSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
