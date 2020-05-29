import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkersAndShopsRoutingModule} from './workers-and-shops-routing.module';
import {WorkersAndShopsPageComponent} from './workers-and-shops-page/workers-and-shops-page.component';
import {WorkersComponent} from './workers/workers.component';
import {ShopsComponent} from './shops/shops.component';


@NgModule({
  declarations: [
    WorkersAndShopsPageComponent,
    WorkersComponent,
    ShopsComponent
  ],
  imports: [
    CommonModule,
    WorkersAndShopsRoutingModule
  ]
})
export class WorkersAndShopsModule {
}
