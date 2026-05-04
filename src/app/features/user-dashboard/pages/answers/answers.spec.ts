import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Answers } from './answers';

describe('Answers', () => {
  let component: Answers;
  let fixture: ComponentFixture<Answers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Answers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Answers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
