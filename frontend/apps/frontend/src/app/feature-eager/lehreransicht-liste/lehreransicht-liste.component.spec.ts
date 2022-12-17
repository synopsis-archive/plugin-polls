import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LehreransichtListeComponent } from './lehreransicht-liste.component';

describe('LehreransichtListeComponent', () => {
  let component: LehreransichtListeComponent;
  let fixture: ComponentFixture<LehreransichtListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LehreransichtListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LehreransichtListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
