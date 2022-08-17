import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  private carId!: string
  private routeSubscription!: Subscription
  public seller!: any
  public carForm!: FormGroup
  public car: Car = {
    make: '',
    model: '',
    year: 0,
    seller: ''
  }

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.updateId()
    this.getCar()
  }
  getCar(){
    this.carService.getCar(this.carId).subscribe((res) => {
      // Init form
      this.carForm = this.fb.group(res)
      this.seller = res.seller
    })
  }
  updateId(){
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.carId = params['id']
    })
  }
  onUpdate(){
    this.car.make = this.carForm.value.make
    this.car.model = this.carForm.value.model
    this.car.year = this.carForm.value.year

    this.carService.updateCar(this.carId, this.car).subscribe((res) => {
      if (res)
        alert('Succes')
    })
  }

}
