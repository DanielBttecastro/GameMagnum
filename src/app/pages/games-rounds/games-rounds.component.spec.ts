import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesRoundsComponent } from './games-rounds.component';

describe('GamesRoundsComponent', () => {
  let component: GamesRoundsComponent;
  let fixture: ComponentFixture<GamesRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesRoundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
