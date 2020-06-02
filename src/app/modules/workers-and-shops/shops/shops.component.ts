import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {WorkersShopsDataService} from '../workers-shops-data.service';
import {IShop, IShops} from '../models';

@Component({
  selector: 'super-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent implements OnInit {
  @HostBinding('class') readonly classes = ['shops'];

  @Output()
  movedShop = new EventEmitter<IShop>();

  shops: IShops;

  // Shops stored in Map for restoring them from here
  private _movedShops = new Map<number, IShop>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _dataService: WorkersShopsDataService
  ) {
  }

  ngOnInit(): void {
    this._dataService.getShopsData().subscribe((s: IShops) => this.shops = s);
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
}
