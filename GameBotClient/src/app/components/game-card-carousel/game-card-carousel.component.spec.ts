import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardCarouselComponent } from './game-card-carousel.component';

describe('GameCardCarouselComponent', () => {
  let component: GameCardCarouselComponent;
  let fixture: ComponentFixture<GameCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCardCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
