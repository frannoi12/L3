import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpruntComponent } from './create.component';

describe('CreateEmpruntComponent', () => {
  let component: CreateEmpruntComponent;
  let fixture: ComponentFixture<CreateEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmpruntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
