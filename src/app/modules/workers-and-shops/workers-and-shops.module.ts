import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkersAndShopsRoutingModule} from './workers-and-shops-routing.module';
import {WorkersAndShopsPageComponent} from './workers-and-shops-page/workers-and-shops-page.component';
import {WorkersComponent} from './workers/workers.component';
import {ShopsComponent} from './shops/shops.component';
import {MaterialModule} from '../../material.module';
import {WorkersShopsDataService} from './workers-shops-data.service';
import {WorkersShopsStateService} from './workers-shops-state.service';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {HttpClientModule} from '@angular/common/http';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    WorkersAndShopsPageComponent,
    WorkersComponent,
    ShopsComponent
  ],
  imports: [
    CommonModule,
    WorkersAndShopsRoutingModule,
    MaterialModule,
    PerfectScrollbarModule,
    HttpClientModule
  ],
  providers: [
    WorkersShopsDataService,
    WorkersShopsStateService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class WorkersAndShopsModule {
}
