import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {of} from 'rxjs';
import MOCK_USERS from '../../../mocks/users';

interface IWorker {
  id: number;
  fullName: string;
  logo: string;
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

  private _addedWorkers = new Map<number, IWorker>();

  get addedWorkers(): IWorker[] {
    return [...this._addedWorkers.values()];
  }

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    of(MOCK_USERS).subscribe((v: IWorker[]) => {
      this.workers = v;
    });
  }

  trackByFn(index: number, worker: IWorker): number {
    return worker.id;
  }

  onAddWorkerClick() {
    const worker = this._getWorker();

    if (!worker) {
      return;
    }

    this._addedWorkers.set(worker.id, worker);
    this._cdr.markForCheck();
  }

  onWorkerDelete(id: number) {
    const worker = this._addedWorkers.get(id);

    this.workers.push(worker);
  }

  private _getWorker() {
    return this.workers.pop();
  }
}
