import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'super-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
