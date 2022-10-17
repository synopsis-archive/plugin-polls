import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAuswertungComponent } from './graph-auswertung.component';

describe('GraphAuswertungComponent', () => {
  let component: GraphAuswertungComponent;
  let fixture: ComponentFixture<GraphAuswertungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphAuswertungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphAuswertungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
