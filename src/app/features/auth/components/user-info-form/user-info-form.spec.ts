import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoForm } from './user-info-form';

describe('UserInfoForm', () => {
  let component: UserInfoForm;
  let fixture: ComponentFixture<UserInfoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
