import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { VehicleService } from '../vehicle.service';
import { InventoryTableDataSource, InventoryTableItem } from './inventory-table-datasource';

export enum Status {
  inStock = "In Stock",
  sold = "Sold",
  dealPending = "Deal Pending",
  inTrade = "In Trade"
}
@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<InventoryTableItem>;
  dataSource: InventoryTableDataSource;
  vehicles: InventoryTableItem[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["stockNumber","year","make","model","trim","status","vin","inStockDate"];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.dataSource = new InventoryTableDataSource(this.vehicleService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}