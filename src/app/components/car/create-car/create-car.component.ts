import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {
  public userId!: string
  public carForm!: FormGroup
  public car: Car = {
    make: '',
    model: '',
    year: 2000,
  }

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId']
    })
    this.initForm()
  }
  initForm(): void {
    this.carForm = this.fb.group(this.car)
  }
  onCreate(): void {
    this.car = this.carForm.value
    this.carService.createCar(this.car, this.userId).subscribe((res) => {
      if (res) {
        alert('Car succesfully created')
        this.router.navigate(['user', this.userId])
      }
    }, (err) => {
        alert(err.error)
      }
    )
  }
  
}
