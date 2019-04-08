import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGameIAComponent } from './config-game-ia.component';

describe('ConfigGameIAComponent', () => {
  let component: ConfigGameIAComponent;
  let fixture: ComponentFixture<ConfigGameIAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigGameIAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGameIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
