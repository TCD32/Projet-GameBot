import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGamePickerComponent } from './header-game-picker.component';

describe('HeaderGamePickerComponent', () => {
  let component: HeaderGamePickerComponent;
  let fixture: ComponentFixture<HeaderGamePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderGamePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGamePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
