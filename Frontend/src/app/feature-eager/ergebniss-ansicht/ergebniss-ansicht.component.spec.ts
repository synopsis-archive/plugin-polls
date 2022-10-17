import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErgebnissAnsichtComponent } from './ergebniss-ansicht.component';

describe('ErgebnissAnsichtComponent', () => {
  let component: ErgebnissAnsichtComponent;
  let fixture: ComponentFixture<ErgebnissAnsichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErgebnissAnsichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErgebnissAnsichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
