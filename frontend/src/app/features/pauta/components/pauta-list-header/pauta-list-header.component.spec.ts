import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautaListHeaderComponent } from './pauta-list-header.component';

describe('PautaListHeaderComponent', () => {
  let component: PautaListHeaderComponent;
  let fixture: ComponentFixture<PautaListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PautaListHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PautaListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
