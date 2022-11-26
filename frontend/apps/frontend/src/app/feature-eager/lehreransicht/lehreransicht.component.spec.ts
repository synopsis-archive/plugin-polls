import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LehreransichtComponent } from './lehreransicht.component';

describe('LehreransichtComponent', () => {
  let component: LehreransichtComponent;
  let fixture: ComponentFixture<LehreransichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LehreransichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LehreransichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
