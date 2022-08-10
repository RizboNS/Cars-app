import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
  @Input() userId!: string
  @Output() refreshUser = new EventEmitter()
  public carForm!: FormGroup
  public car: Car = {
    make: '',
    model: '',
    year: 2000,
  }

  constructor(
    private fb: FormBuilder,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(): void {
    this.carForm = this.fb.group(this.car)
  }
  onCreate(): void {
    this.car = this.carForm.value
    this.carService.createCar(this.car, this.userId).subscribe((res) => {
      if (res) {
        // alert('Car succesfully created')
        this.refreshUser.emit()
      }
    })
  }
  
}
