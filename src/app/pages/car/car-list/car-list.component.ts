import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  public cars: Car[] = []
  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.initCars()
  }

  initCars() {
    this.carService.getCars().subscribe((res) => {
      this.cars = res
    })
  }

}
