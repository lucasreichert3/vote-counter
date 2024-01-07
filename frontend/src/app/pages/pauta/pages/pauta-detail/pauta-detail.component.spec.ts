import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PautaDetailComponent } from './pauta-detail.component';

describe('PautaDetailComponent', () => {
  let component: PautaDetailComponent;
  let fixture: ComponentFixture<PautaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PautaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PautaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
