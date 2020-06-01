import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {of} from 'rxjs';
import MOCK_USERS from '../../../mocks/users';
import {IShop, IShops} from '../shops/shops.component';

interface IWorker {
  id: number;
  fullName: string;
  logo: string;
  shops?: IShops;
}

@Component({
  selector: 'super-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersComponent implements OnInit {
  @HostBinding('class') readonly classes = ['workers'];

  workers: IWorker[];

  activeWorkerId: number;

  private _addedWorkers = new Map<number, IWorker>();

  get addedWorkers(): IWorker[] {
    return [...this._addedWorkers.values()];
  }

  get activeWorker(): IWorker {
    return this._addedWorkers.get(this.activeWorkerId);
  }

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    of(MOCK_USERS).subscribe((w: IWorker[]) => this.workers = w);
  }

  trackByFn(index: number, worker: IWorker): number {
    return worker.id;
  }

  onAddWorkerClick() {
    const worker = this._getWorker();

    if (!worker) {
      return;
    }

    this.activeWorkerId = worker.id;

    this._addedWorkers.set(worker.id, worker);
    this._cdr.markForCheck();
  }

  onWorkerDelete(id: number) {
    const worker = this._addedWorkers.get(id);

    this.workers.push(worker);
  }

  onWorkerTabClick(workerId: number) {
    this.activeWorkerId = workerId;
    this._cdr.markForCheck();
  }

  addWorkerShop(shop: IShop) {
    this._cdr.markForCheck();

    if (!this.activeWorker.shops) {
      this.activeWorker.shops = [];
    }

    this.activeWorker.shops.push(shop);
  }

  private _getWorker() {
    return this.workers.pop();
  }
}
