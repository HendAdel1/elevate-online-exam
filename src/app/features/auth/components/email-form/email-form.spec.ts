import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailForm } from './email-form';

describe('EmailForm', () => {
  let component: EmailForm;
  let fixture: ComponentFixture<EmailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with email control', () => {
    expect(component.form.get('email')).toBeTruthy();
  });

  it('form should be invalid initially', () => {
    expect(component.form.valid).toBeFalsy();
  });
});
