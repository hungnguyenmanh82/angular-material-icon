import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeIconComponent } from './font-awesome-icon.component';

describe('FontAwesomeIconComponent', () => {
  let component: FontAwesomeIconComponent;
  let fixture: ComponentFixture<FontAwesomeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontAwesomeIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FontAwesomeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
