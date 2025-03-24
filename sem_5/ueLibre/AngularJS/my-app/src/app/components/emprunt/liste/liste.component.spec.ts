import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEmpruntComponent } from './liste.component';

describe('ListeEmpruntComponent', () => {
  let component: ListeEmpruntComponent;
  let fixture: ComponentFixture<ListeEmpruntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeEmpruntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
