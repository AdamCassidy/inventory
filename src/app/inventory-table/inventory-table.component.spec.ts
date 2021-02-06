import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { InventoryTableComponent } from './inventory-table.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehicleService } from '../vehicle.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('InventoryTableComponent', () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;
  let de: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InventoryTableComponent],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          NoopAnimationsModule,
          MatPaginatorModule,
          MatSortModule,
          MatTableModule,
          VehicleService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTableComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
  it('should have a tag with id = "inStockDate" to be "In Stock Date"', fakeAsync(() => {
    tick(500);
    expect(de.query(By.css('#inStockDate')).nativeElement.innertext).toBe(
      'In Stock Date'
    );
  }));
  it('should have a span tag with id = "stockNumber" to be "Stock#"', fakeAsync(() => {
    tick(500);
    expect(de.query(By.css('#stockNumber')).nativeElement.innertext).toBe(
      'Stock#'
    );
  }));
  it('should have a button with id = "editButton" with text of "Edit"', fakeAsync(() => {
    tick(500);
    expect(de.query(By.css('#editButton')).nativeElement.innertext).toBe(
      'Edit'
    );
  }));
});
