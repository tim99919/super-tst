import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import MOCK_SHOPS from '../../mocks/shops';
import MOCK_USERS from '../../mocks/users';
import {IShops, IWorkers, IWorkerShop} from './models';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {catchError} from 'rxjs/operators';

@Injectable()
export class WorkersShopsDataService {
  readonly ShopsWorkersMap = new Map<IWorkerShop['shopId'], IWorkerShop['workerId']>();

  constructor(
    private _http: HttpClient,
    private _sb: MatSnackBar
  ) {
  }

  addWorkerShopBinding(workerId: number, shopId: number): void {
    this.ShopsWorkersMap.set(shopId, workerId);
    this.createWorkerShopRequest();
  }

  getShopsData(): Observable<IShops> {
    return of(MOCK_SHOPS);
  }

  getWorkersData(): Observable<IWorkers> {
    return of(MOCK_USERS);
  }

  removeWorkerShopBinding(shopId: number): void {
    this.ShopsWorkersMap.delete(shopId);
  }

  createWorkerShopRequest(): Observable<any> {
    const request = [];

    for (const shop of this.ShopsWorkersMap) {
      request.push(shop.reverse());
    }

    return this._http.post('', JSON.stringify(request))
      .pipe(catchError((err: HttpErrorResponse) => {
        this._sb.open(err.message, 'ok', {duration: 5000});

        return throwError('error');
      }));
  }
}
