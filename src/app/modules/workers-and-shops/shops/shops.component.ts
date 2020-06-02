import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output} from '@angular/core';
import {WorkersShopsDataService} from '../workers-shops-data.service';
import {IShop, IShops} from '../models';
import {WorkersShopsStateService} from '../workers-shops-state.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'super-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent implements OnInit, OnDestroy {
  @HostBinding('class') readonly classes = ['shops'];

  @Output()
  movedShop = new EventEmitter<IShop>();

  shops: IShops;

  activeWorker;

  readonly destroySbj = new Subject();

  // Shops stored in Map for restoring them from here
  private _movedShops = new Map<number, IShop>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _dataService: WorkersShopsDataService,
    private _wsStateService: WorkersShopsStateService
  ) {
  }

  ngOnInit(): void {
    this._dataService.getShopsData().subscribe((s: IShops) => this.shops = s);

    this._wsStateService.activeWorker$
      .subscribe(v => {
        this.activeWorker = v;
        this._cdr.markForCheck();
      });
  }

  trackById(index: number, shop: IShop): number {
    return shop.id;
  }

  onMoveButtonClick(shop: IShop): void {
    const shopToMoveIndex = this.shops.findIndex(s => s === shop);
    this.shops.splice(shopToMoveIndex, 1);
    this._movedShops.set(shop.id, shop);
    this.movedShop.emit(shop);
  }

  restoreShopFromMoved(shopId: number): void {
    this.shops.push(this._movedShops.get(shopId));
    this._cdr.markForCheck();
  }

  ngOnDestroy() {
    this.destroySbj.next();
    this.destroySbj.complete();
  }
}
