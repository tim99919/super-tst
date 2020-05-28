import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkersAndShopsRoutingModule} from './workers-and-shops-routing.module';
import {WorkersAndShopsPageComponent} from './workers-and-shops-page/workers-and-shops-page.component';


@NgModule({
  declarations: [
    WorkersAndShopsPageComponent
  ],
  imports: [
    CommonModule,
    WorkersAndShopsRoutingModule
  ]
})
export class WorkersAndShopsModule {
}
