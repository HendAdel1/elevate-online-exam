import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpForm } from './verify-otp-form';

describe('VerifyOtpForm', () => {
  let component: VerifyOtpForm;
  let fixture: ComponentFixture<VerifyOtpForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyOtpForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyOtpForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
