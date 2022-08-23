import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public cars: Car[] = [];
  private sub1: Subscription = new Subscription();
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.initCars();
  }
  initCars() {
    this.sub1 = this.carService.getCars().subscribe((res) => {
      this.cars = res;
    });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
