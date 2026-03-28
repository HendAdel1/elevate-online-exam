import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubTitle } from './auth-sub-title';

describe('AuthSubTitle', () => {
  let component: AuthSubTitle;
  let fixture: ComponentFixture<AuthSubTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSubTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSubTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
