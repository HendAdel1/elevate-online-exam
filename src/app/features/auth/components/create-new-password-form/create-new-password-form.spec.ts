import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPasswordForm } from './create-new-password-form';

describe('CreateNewPasswordForm', () => {
  let component: CreateNewPasswordForm;
  let fixture: ComponentFixture<CreateNewPasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewPasswordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPasswordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
