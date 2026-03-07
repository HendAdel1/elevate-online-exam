import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordForm } from './create-password-form';

describe('CreatePasswordForm', () => {
  let component: CreatePasswordForm;
  let fixture: ComponentFixture<CreatePasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePasswordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePasswordForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
