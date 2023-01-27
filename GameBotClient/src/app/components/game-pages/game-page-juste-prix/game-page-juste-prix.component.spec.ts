import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageJustePrixComponent } from './game-page-juste-prix.component';

describe('GamePageJustePrixComponent', () => {
  let component: GamePageJustePrixComponent;
  let fixture: ComponentFixture<GamePageJustePrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePageJustePrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePageJustePrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
