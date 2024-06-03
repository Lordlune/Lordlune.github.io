import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsMainComponent } from './os-main.component';

describe('OsMainComponent', () => {
  let component: OsMainComponent;
  let fixture: ComponentFixture<OsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
