import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGameIaCheckersComponent } from './config-game-ia-checkers.component';

describe('ConfigGameIaCheckersComponent', () => {
  let component: ConfigGameIaCheckersComponent;
  let fixture: ComponentFixture<ConfigGameIaCheckersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigGameIaCheckersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGameIaCheckersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
