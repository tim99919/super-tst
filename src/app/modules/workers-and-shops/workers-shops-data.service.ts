import {Injectable} from '@angular/core';

export interface IWorkerShop {
  workerId: number;
  shopId: number;
}

@Injectable()
export class WorkersShopsDataService {
  readonly workersAndShopsMapping: IWorkerShop[] = [];

  constructor() {
  }

  addWorkerShopBinding(workerId: number, shopId: number) {
    this.workersAndShopsMapping.push({workerId, shopId});
    console.log(this.workersAndShopsMapping);
  }
}
