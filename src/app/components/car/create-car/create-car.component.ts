import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarViewData } from 'src/app/assets/car-view-data';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css'],
})
export class CreateCarComponent implements OnInit, OnDestroy {
  public userId!: string;
  public carForm!: FormGroup;
  public files: string[] = [];

  carViewData = CarViewData;
  selectedModelData = [];
  private sub1: Subscription = new Subscription();
  private sub2: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.sub1 = this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
    this.carForm = this.fb.group({
      make: [],
      model: [],
    });
  }
  onCreate(): void {
    // this.car = this.carForm.value;
    const carData = new FormData();
    carData.append('make', this.carForm.value.make);
    carData.append('model', this.carForm.value.model);
    carData.append('year', this.carForm.value.year);
    for (var i = 0; i < this.files.length; i++) {
      carData.append('images', this.files[i]);
    }

    this.sub2 = this.carService.createCar(carData, this.userId).subscribe({
      next: (res) => {
        if (res) {
          alert('Car succesfully created');
          this.router.navigate(['user', this.userId]);
        }
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
  onFileSelect(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  onBrandSelect(i: number): void {
    this.selectedModelData = this.carViewData[i].models;
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
