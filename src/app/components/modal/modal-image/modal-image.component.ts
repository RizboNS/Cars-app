import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css'],
})
export class ModalImageComponent implements OnInit {
  @Input() image: any;
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}
  toggleImage() {
    this.modalService.toggleImageOpen();
  }
}
