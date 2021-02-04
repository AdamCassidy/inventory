import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InventoryTableItem, Status } from './inventory-table/inventory-table-datasource';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {

  constructor() {}

  getVehicles(): Observable<InventoryTableItem[]> {

    return of([
        {stockNumber: "A1200",
        year: 2000,
        make: "Toyota",
        model: "Camry",
        trim: "LE",
        status: Status.inStock,
        vin: "4Y1SL65848Z411439",
        inStockDate: new Date(new Date().toISOString())},
        {stockNumber: "B6300",
        year: 2020,
        make: "Chevrolet",
        model: "Silverado",
        trim: "XSE",
        status: Status.inTrade,
        vin: "7E5SL65848Z467439",
        inStockDate: new Date(new Date().toISOString())},
        {stockNumber: "A3400",
        year: 2004,
        make: "Ford",
        model: "Escape",
        trim: "LE",
        status: Status.sold,
        vin: "GJ3I45O748Z414I23",
        inStockDate: new Date(new Date().toISOString())}
      ]);
  }
}
