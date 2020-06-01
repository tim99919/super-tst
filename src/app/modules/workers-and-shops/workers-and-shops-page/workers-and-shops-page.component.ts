import {Component, OnInit, ViewChild} from '@angular/core';
import {IShop} from '../shops/shops.component';
import {WorkersComponent} from '../workers/workers.component';
import {WorkersShopsDataService} from '../workers-shops-data.service';

@Component({
  templateUrl: './workers-and-shops-page.component.html',
  styleUrls: ['./workers-and-shops-page.component.scss']
})
export class WorkersAndShopsPageComponent implements OnInit {
  @ViewChild(WorkersComponent, {static: false}) workers: WorkersComponent;

  constructor(private _workersShopsDataService: WorkersShopsDataService) {
  }

  ngOnInit() {
  }

  onShopMove(shop: IShop) {
    this._workersShopsDataService.addWorkerShopBinding(this.workers.activeWorker.id, shop.id);
    this.workers.addWorkerShop(shop);
  }
}
