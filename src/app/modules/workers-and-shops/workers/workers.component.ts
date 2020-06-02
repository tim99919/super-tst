import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {WorkersShopsDataService} from '../workers-shops-data.service';
import {IShop, IWorker, IWorkers} from '../models';
import {WorkersShopsStateService} from '../workers-shops-state.service';


@Component({
  selector: 'super-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersComponent implements OnInit {
  @HostBinding('class') readonly classes = ['workers'];

  @Output()
  removedShop = new EventEmitter<IShop>();

  @Output()
  removedWorker = new EventEmitter<IWorker>();

  workers: IWorkers;

  activeWorkerId: number;

  private _addedWorkers = new Map<number, IWorker>();

  get addedWorkers(): IWorkers {
    return [...this._addedWorkers.values()];
  }

  get activeWorker(): IWorker {
    return this._addedWorkers.get(this.activeWorkerId);
  }

  constructor(
    private _cdr: ChangeDetectorRef,
    private _dataService: WorkersShopsDataService,
    private _wsStateService: WorkersShopsStateService
  ) {
  }

  ngOnInit(): void {
    this._dataService.getWorkersData().subscribe((w: IWorkers) => this.workers = w);
  }

  trackByFn(index: number, worker: IWorker): number {
    return worker.id;
  }

  onAddWorkerClick(): void {
    const worker = this._getWorker();

    if (!worker) {
      return;
    }

    this.activeWorkerId = worker.id;
    this._wsStateService.activeWorker = this.activeWorkerId;

    this._addedWorkers.set(worker.id, worker);
    this._cdr.markForCheck();
  }

  onWorkerDeleteClick(): void {
    const worker = this._addedWorkers.get(this.activeWorkerId);
    const previouslyAddedWorkerId = this._findPreviouslyAddedWorkerId();

    this.workers.push(worker);

    this.removedWorker.emit(this.activeWorker);
    this._addedWorkers.delete(this.activeWorkerId);
    this.activeWorkerId = previouslyAddedWorkerId;
    this._wsStateService.activeWorker = this.activeWorkerId ? this.activeWorkerId : null;
    this._cdr.markForCheck();
  }

  onWorkerTabClick(workerId: number): void {
    this.activeWorkerId = workerId;
    this._cdr.markForCheck();
  }

  addWorkerShop(shop: IShop): void {
    this._cdr.markForCheck();

    if (!this.activeWorker.shops) {
      this.activeWorker.shops = [];
    }

    this.activeWorker.shops.push(shop);
  }

  removeActiveWorkerShops(shopId?: number): void {
    if (!shopId) {
      this.activeWorker.shops = undefined;

      return;
    }

    const shopToRemoveIndex = this.activeWorker.shops.findIndex(s => s.id === shopId);

    this.activeWorker.shops.splice(shopToRemoveIndex, 1);
  }

  onShopRemoveClick(shop: IShop): void {
    this.removedShop.emit(shop);
    this.removeActiveWorkerShops(shop.id);
  }

  private _getWorker(): IWorker {
    return this.workers.pop();
  }

  private _findPreviouslyAddedWorkerId(): number {
    const workersIds = [...this._addedWorkers.keys()];
    const activeWorkerIndex = workersIds.findIndex(w => w === this.activeWorkerId);

    if (activeWorkerIndex === 0) {
      return workersIds[activeWorkerIndex + 1];
    }

    return workersIds[activeWorkerIndex - 1];
  }
}
