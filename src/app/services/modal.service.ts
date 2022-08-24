import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modalOpen = false;
  constructor() {}

  toggleImageOpen() {
    if (this.modalOpen) this.modalOpen = false;
    else this.modalOpen = true;
  }
}
