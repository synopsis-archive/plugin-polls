import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchueleransichtComponent } from './schueleransicht.component';

describe('SchueleransichtComponent', () => {
  let component: SchueleransichtComponent;
  let fixture: ComponentFixture<SchueleransichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchueleransichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchueleransichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
