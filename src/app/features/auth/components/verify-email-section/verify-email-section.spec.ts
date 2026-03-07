import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailSection } from './verify-email-section';

describe('VerifyEmailSection', () => {
  let component: VerifyEmailSection;
  let fixture: ComponentFixture<VerifyEmailSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyEmailSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyEmailSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
