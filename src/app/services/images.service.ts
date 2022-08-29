import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  public selectedImageIndex = 0;
  constructor() {}
  resetSelectedImageIndex() {
    this.selectedImageIndex = 0;
  }
}
