import {Component, OnInit, ViewChild} from '@angular/core';
import {WorkersComponent} from '../workers/workers.component';
import {WorkersShopsDataService} from '../workers-shops-data.service';
import {ShopsComponent} from '../shops/shops.component';
import {IShop, IWorker} from '../models';

@Component({
  templateUrl: './workers-and-shops-page.component.html',
  styleUrls: ['./workers-and-shops-page.component.scss']
})
export class WorkersAndShopsPageComponent implements OnInit {
  @ViewChild(WorkersComponent, {static: false}) workersComponent: WorkersComponent;
  @ViewChild(ShopsComponent, {static: false}) shopsComponent: ShopsComponent;

  constructor(private _workersShopsDataService: WorkersShopsDataService) {
  }

  ngOnInit() {
  }

  onShopMove(shop: IShop): void {
    this._workersShopsDataService.addWorkerShopBinding(this.workersComponent.activeWorker.id, shop.id);
    this.workersComponent.addWorkerShop(shop);
  }

  onShopDeleteFromWorker(shop: IShop): void {
    this._workersShopsDataService.removeWorkerShopBinding(shop.id);
  }

  onWorkerDelete(worker: IWorker): void {
    if (!worker.shops || !worker.shops.length) {
      return;
    }

    let shop = worker.shops.pop();

    while (shop) {
      this._workersShopsDataService.removeWorkerShopBinding(shop.id);
      this.shopsComponent.restoreShopFromMoved(shop.id);

      shop = worker.shops.pop();
    }
  }
}
