import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  @Input() carId!: string
  public car!: Car
  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.carService.getCar(this.carId)
      .subscribe((data) => {
        this.car = data
      })
  }

}
