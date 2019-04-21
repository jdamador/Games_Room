import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGamePlayersCheckersComponent } from './config-game-players-checkers.component';

describe('ConfigGamePlayersCheckersComponent', () => {
  let component: ConfigGamePlayersCheckersComponent;
  let fixture: ComponentFixture<ConfigGamePlayersCheckersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigGamePlayersCheckersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGamePlayersCheckersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
