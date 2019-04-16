import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGamePlayersComponent } from './config-game-players.component';

describe('ConfigGamePlayersMemoryComponent', () => {
  let component: ConfigGamePlayersComponent;
  let fixture: ComponentFixture<ConfigGamePlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigGamePlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGamePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
