import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import MOCK_SHOPS from '../../mocks/shops';
import MOCK_USERS from '../../mocks/users';
import {IShops, IWorkers, IWorkerShop} from './models';

@Injectable()
export class WorkersShopsDataService {
  readonly ShopsWorkersMap = new Map<IWorkerShop['shopId'], IWorkerShop['workerId']>();

  addWorkerShopBinding(workerId: number, shopId: number): void {
    this.ShopsWorkersMap.set(shopId, workerId);
    this.createWorkerShopRequest();
  }

  getShopsData(): Observable<IShops> {
    return of(MOCK_SHOPS);
  }

  getWorkersData(): Observable<IWorkers> {
    return of(MOCK_USERS);
  }

  removeWorkerShopBinding(shopId: number): void {
    this.ShopsWorkersMap.delete(shopId);
  }

  createWorkerShopRequest() {
    const request = [];

    for (const shop of this.ShopsWorkersMap) {
      request.push(shop.reverse());
    }

    console.log(request);
  }
}
