import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautaListTableComponent } from './pauta-list-table.component';

describe('PautaListTableComponent', () => {
  let component: PautaListTableComponent;
  let fixture: ComponentFixture<PautaListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PautaListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PautaListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
