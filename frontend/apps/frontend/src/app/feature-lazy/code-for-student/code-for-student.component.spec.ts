import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeForStudentComponent } from './code-for-student.component';

describe('CodeForStudentComponent', () => {
  let component: CodeForStudentComponent;
  let fixture: ComponentFixture<CodeForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeForStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
