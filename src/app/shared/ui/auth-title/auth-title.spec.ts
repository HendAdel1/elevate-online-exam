import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTitle } from './auth-title';

describe('AuthTitle', () => {
  let component: AuthTitle;
  let fixture: ComponentFixture<AuthTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
