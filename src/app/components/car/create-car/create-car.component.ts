import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit, OnDestroy {
  public userId!: string
  public carForm!: FormGroup
  public car: Car = {
    make: '',
    model: '',
    year: 2000,
  }

  private sub1: Subscription = new Subscription()
  private sub2: Subscription = new Subscription()
  
  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(): void {
    this.sub1 = this.route.params.subscribe((params) => {
      this.userId = params['userId']
    })
    this.carForm = this.fb.group(this.car)
  }
  onCreate(): void {
    this.car = this.carForm.value
    this.sub2 = this.carService.createCar(this.car, this.userId).subscribe({ 
      next: (res) => {
        if (res) {
          alert('Car succesfully created')
          this.router.navigate(['user', this.userId])
        }
      },
      error: (err) => {
          alert(err.error)
        }
      })
  }
  

  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }
  
}
