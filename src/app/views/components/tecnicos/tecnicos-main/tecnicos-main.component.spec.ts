import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosMainComponent } from './tecnicos-main.component';

describe('TecnicosMainComponent', () => {
  let component: TecnicosMainComponent;
  let fixture: ComponentFixture<TecnicosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicosMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnicosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
