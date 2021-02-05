import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { VehicleService } from '../vehicle.service';
import {
  InventoryTableDataSource,
  InventoryTableItem,
} from './inventory-table-datasource';

const VEHICLE_SCHEMA = {
  stockNumber: 'text',
  year: 'number',
  make: 'text',
  model: 'text',
  trim: 'text',
  status: 'text',
  vin: 'text',
  inStockDate: 'date',
};

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css'],
})
export class InventoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<InventoryTableItem>;
  dataSource: InventoryTableDataSource;
  dataSchema = VEHICLE_SCHEMA;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'stockNumber',
    'year',
    'make',
    'model',
    'trim',
    'status',
    'vin',
    'inStockDate',
    'edit',
  ];

  constructor(private vehicleService: VehicleService) {
    this.refresh();
  }

  ngOnInit() {
    this.dataSource = new InventoryTableDataSource(this.vehicleService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  refresh(): void {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      let tempVehicles = [];
      delete vehicles.id;

      for (let index in vehicles) {
        tempVehicles.push(vehicles[index]);
      }

      this.dataSource.data = tempVehicles.map((vehicle) => {
        vehicle.inStockDate = new Date(vehicle.inStockDate);
        return vehicle;
      });
    });
  }
}
