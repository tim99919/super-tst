import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import MOCK_SHOPS from '../../../mocks/shops';
import {of} from 'rxjs';

export interface IShop {
  id: number;
  name: string;
  fullAddress: string;
}

export type IShops = IShop[];

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

  private _movedShops = new Map<number, IShop>();

  constructor() {
  }

  ngOnInit() {
    of(MOCK_SHOPS).subscribe((s: IShops) => this.shops = s);
  }

  trackById(index: number, shop: IShop): number {
    return shop.id;
  }

  onMoveButtonClick(shop: IShop) {
    this._movedShops.set(shop.id, shop);
    this.movedShop.emit(shop);
  }
}
