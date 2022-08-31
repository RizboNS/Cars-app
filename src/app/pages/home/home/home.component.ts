import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car.service';
import { CarViewData } from 'src/app/assets/car-view-data';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public carsOriginal: Car[] = [];
  public cars: Car[] = [];
  carViewData = CarViewData;
  selectedModelData = ['All'];
  private sub1: Subscription = new Subscription();
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.initCars();
    if (this.carViewData[0].name != 'All') {
      this.carViewData.unshift({
        name: 'All',
        models: [],
      });
    }
  }
  initCars() {
    this.sub1 = this.carService.getCars().subscribe((res) => {
      this.carsOriginal = res;
      this.cars = res;
    });
  }
  sortByYearDesc() {
    this.cars.sort((a, b) => {
      return parseInt(b.year) - parseInt(a.year);
    });
  }
  sortByYearAsc() {
    this.cars.sort((a, b) => {
      return parseInt(a.year) - parseInt(b.year);
    });
  }
  sortByPriceDesc() {
    this.cars.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });
  }
  sortByPriceAsc() {
    this.cars.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });
  }
  filterByMake(event: any) {
    let make = event.target.value;
    if (make === 'All') {
      this.undoFilter();
      return;
    }
    this.undoFilter();
    this.cars = this.cars.filter((car) => {
      return car.make === make;
    });
  }
  undoFilter() {
    this.cars = this.carsOriginal;
  }
  filterByModel(event: any) {
    let model = event.target.value;
    if (model === 'All') {
      this.undoFilter();
      return;
    }
    this.undoFilter();
    this.cars = this.cars.filter((car) => {
      return car.model === model;
    });
  }
  onBrandSelect(event): void {
    this.selectedModelData = ['All'];
    const name = event.target.value;
    const models = this.carViewData.filter((carMaker) => {
      return carMaker.name === name;
    });
    models[0].models.forEach((model) => {
      this.selectedModelData.push(model);
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
