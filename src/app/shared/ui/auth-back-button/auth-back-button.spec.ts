import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBackButton } from './auth-back-button';

describe('AuthBackButton', () => {
  let component: AuthBackButton;
  let fixture: ComponentFixture<AuthBackButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBackButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthBackButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
