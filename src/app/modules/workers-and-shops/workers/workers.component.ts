import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'super-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
