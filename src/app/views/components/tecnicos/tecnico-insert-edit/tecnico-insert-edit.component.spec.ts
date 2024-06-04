import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoInsertEditComponent } from './tecnico-insert-edit.component';

describe('TecnicoInsertEditComponent', () => {
  let component: TecnicoInsertEditComponent;
  let fixture: ComponentFixture<TecnicoInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicoInsertEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecnicoInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
