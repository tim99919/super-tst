import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'super-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersComponent implements OnInit {
  @HostBinding('class') readonly classes = ['workers'];

  addedWorkers = [1, 2, 3];

  constructor() {
  }

  ngOnInit() {
  }

}
