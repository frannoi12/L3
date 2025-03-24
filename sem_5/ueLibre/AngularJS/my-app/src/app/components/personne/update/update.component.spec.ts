import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonnesComponent } from './update.component';

describe('UpdatePersonnesComponent', () => {
  let component: UpdatePersonnesComponent;
  let fixture: ComponentFixture<UpdatePersonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePersonnesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePersonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
