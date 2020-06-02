import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class WorkersShopsStateService {
  private _activeWorkerSource = new BehaviorSubject<number>(null);
  activeWorker$ = this._activeWorkerSource.asObservable();

  set activeWorker(value: number) {
    this._activeWorkerSource.next(value);
  }
}
