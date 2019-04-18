import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlayersComponent } from './details-players.component';

describe('DetailsPlayersComponent', () => {
  let component: DetailsPlayersComponent;
  let fixture: ComponentFixture<DetailsPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
