export interface IWorkerShop {
  workerId: number;
  shopId: number;
}

export interface IShop {
  id: number;
  name: string;
  fullAddress: string;
  isDistributed?: boolean;
}

export interface IWorker {
  id: number;
  fullName: string;
  logo: string;
  shops?: IShops;
}

export type IShops = IShop[];
export type IWorkers = IWorker[];
