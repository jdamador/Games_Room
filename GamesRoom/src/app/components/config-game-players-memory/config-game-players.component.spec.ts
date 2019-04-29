import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGamePlayersMemoryComponent } from './config-game-players.component';

describe('ConfigGamePlayersMemoryComponent', () => {
  let component: ConfigGamePlayersMemoryComponent;
  let fixture: ComponentFixture<ConfigGamePlayersMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigGamePlayersMemoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGamePlayersMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
