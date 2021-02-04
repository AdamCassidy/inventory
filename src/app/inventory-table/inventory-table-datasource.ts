import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { VehicleService } from '../vehicle.service';


export enum Status {
  inStock = "In Stock",
  sold = "Sold",
  dealPending = "Deal Pending",
  inTrade = "In Trade"
}
export interface InventoryTableItem {
  stockNumber: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  status: Status.inStock | Status.sold | Status.dealPending | Status.inTrade;
  vin: string;
  inStockDate: Date;
}

/**
 * Data source for the InventoryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InventoryTableDataSource extends DataSource<InventoryTableItem> {
  data: InventoryTableItem[] = this.vehicles;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private vehicleService: VehicleService, private vehicles: InventoryTableItem[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<InventoryTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
    // return this.vehicleService.getVehicles();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InventoryTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: InventoryTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'stockNumber': return compare(a.stockNumber, b.stockNumber, isAsc);
        case 'year': return compare(+a.year, +b.year, isAsc);
        case 'make': return compare(+a.make, +b.make, isAsc);
        case 'model': return compare(+a.model, +b.model, isAsc);
        case 'trim': return compare(+a.trim, +b.trim, isAsc);
        case 'status': return compare(+a.status, +b.status, isAsc);
        case 'vin': return compare(+a.vin, +b.vin, isAsc);
        case 'inStockDate': return compare(+a.inStockDate, +b.inStockDate, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
