import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {

  private menubar = new BehaviorSubject(true);
  menubar$ = this.menubar.asObservable();

  constructor() { }

  refreshMenu() {
    this.menubar.next(true);
  }

}
