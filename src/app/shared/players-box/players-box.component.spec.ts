import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersBoxComponent } from './players-box.component';

describe('PlayersBoxComponent', () => {
  let component: PlayersBoxComponent;
  let fixture: ComponentFixture<PlayersBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
