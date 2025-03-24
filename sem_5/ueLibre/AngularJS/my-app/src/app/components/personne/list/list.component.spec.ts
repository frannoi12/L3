import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonneComponent } from './list.component';

describe('ListPersonneComponent', () => {
  let component: ListPersonneComponent;
  let fixture: ComponentFixture<ListPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPersonneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
