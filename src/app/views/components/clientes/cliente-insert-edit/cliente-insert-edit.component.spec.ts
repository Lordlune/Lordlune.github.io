import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteInsertEditComponent } from './cliente-insert-edit.component';

describe('ClienteInsertEditComponent', () => {
  let component: ClienteInsertEditComponent;
  let fixture: ComponentFixture<ClienteInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteInsertEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
