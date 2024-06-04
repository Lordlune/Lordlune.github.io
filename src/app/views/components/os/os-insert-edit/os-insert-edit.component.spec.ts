import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsInsertEditComponent } from './os-insert-edit.component';

describe('OsInsertEditComponent', () => {
  let component: OsInsertEditComponent;
  let fixture: ComponentFixture<OsInsertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsInsertEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OsInsertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
