import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit {
  slideIndex: number = 1;

  @Input() images: any[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  selectedIndex = 0;
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  selectImage(index: number): void {
    this.selectedIndex = index;
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
  toggleImageOpen() {
    this.modalService.toggleImageOpen();
  }
}
