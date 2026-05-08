import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDashboardLayout } from './user-dashboard-layout';

describe('UserDashboardLayout', () => {
  let component: UserDashboardLayout;
  let fixture: ComponentFixture<UserDashboardLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardLayout]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
