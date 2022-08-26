import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
})
export class CarEditComponent implements OnInit, OnDestroy {
  private carId!: string;
  private routeSubscription: Subscription = new Subscription();

  private sub1: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();

  public seller!: any;
  public carForm!: FormGroup;
  public car: Car = {
    make: '',
    model: '',
    year: '',
    seller: '',
  };
  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateId();
    this.getCar();
  }
  getCar() {
    this.sub1 = this.carService.getCar(this.carId).subscribe((res) => {
      // Init form
      this.carForm = this.fb.group(res);
      this.seller = res.seller;
    });
  }
  updateId() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.carId = params['id'];
    });
  }
  onUpdate() {
    this.car.make = this.carForm.value.make;
    this.car.model = this.carForm.value.model;
    this.car.year = this.carForm.value.year;

    this.sub2 = this.carService
      .updateCar(this.carId, this.car)
      .subscribe((res) => {
        if (res) alert('Succes');
      });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
