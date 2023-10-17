import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageServiceService {
  private isLIstPage: boolean = true;
  pageChangeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  setLispage() {
    this.isLIstPage = !this.isLIstPage;
    this.pageChangeEmitter.emit(this.isLIstPage);
    console.log('isListPage: ' + this.isLIstPage);
  }

  getListPage() {
    return this.isLIstPage;
  }
}
