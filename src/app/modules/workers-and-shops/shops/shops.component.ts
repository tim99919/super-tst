import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import MOCK_SHOPS from '../../../mocks/shops';
import {of} from 'rxjs';

interface IShop {
  id: number;
  name: string;
  fullAddress: string;
}

type IShops = IShop[];

@Component({
  selector: 'super-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent implements OnInit {
  @HostBinding('class') readonly classes = ['shops'];

  shops: IShops;

  constructor() {
  }

  ngOnInit() {
    of(MOCK_SHOPS).subscribe((s: IShops) => this.shops = s);
  }

  trackById(index: number, shop: IShop): number {
    return shop.id;
  }
}
