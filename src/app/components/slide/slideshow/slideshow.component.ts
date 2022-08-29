import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
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
  @Input() isParrentCarEdit = false;
  @Output() triggerDelete = new EventEmitter();
  selectedIndex = 0;
  constructor(
    public modalService: ModalService,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {}

  emmitTriggerDelete() {
    this.triggerDelete.emit();
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
    this.imagesService.selectedImageIndex = this.selectedIndex;
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
    this.imagesService.selectedImageIndex = this.selectedIndex;
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
    this.imagesService.selectedImageIndex = this.selectedIndex;
  }
  toggleImageOpen() {
    this.modalService.toggleImageOpen();
  }
}
