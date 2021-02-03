import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';

const routes: Routes = [
{ path: 'inventory', component: InventoryTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
