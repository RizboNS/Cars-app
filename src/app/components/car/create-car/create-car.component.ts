import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Bodys,
  CarViewData,
  Colors,
  FuelSystem,
  TransitionTypes,
} from 'src/app/assets/car-view-data';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css'],
})
export class CreateCarComponent implements OnInit, OnDestroy {
  public userId!: string;
  public carForm!: FormGroup;
  public files: string[] = [];

  errMsg = '';
  modelMsg = '';
  imageCount: number = 0;
  carViewData = CarViewData;
  selectedModelData = [];
  colors = Colors;
  fuels = FuelSystem;
  bodys = Bodys;
  transitionTypes = TransitionTypes;
  equipment: string[] = [];
  eq = '';
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
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      color: ['', [Validators.required]],
      rangeDriven: ['', [Validators.required]],
      price: ['', [Validators.required]],
      fuelSystem: ['', [Validators.required]],
      bodyType: ['', [Validators.required]],
      horsePower: ['', [Validators.required]],
      engineDisplacement: ['', [Validators.required]],
      transitionType: ['', [Validators.required]],
      equipment: '',
      sellerPhone: ['', [Validators.required]],
      sellerEmail: ['', [Validators.required, Validators.email]],
      sellerComment: ['', [Validators.required]],
    });
  }
  onCreate(): void {
    this.errMsg = '';
    this.carForm.value.equipment = this.equipment;
    const carData = new FormData();
    carData.append('make', this.carForm.value.make);
    carData.append('model', this.carForm.value.model);
    carData.append('year', this.carForm.value.year);
    carData.append('color', this.carForm.value.color);
    carData.append('rangeDriven', this.carForm.value.rangeDriven);
    carData.append('price', this.carForm.value.price);
    carData.append('fuelSystem', this.carForm.value.fuelSystem);
    carData.append('bodyType', this.carForm.value.bodyType);
    carData.append('horsePower', this.carForm.value.horsePower);
    carData.append('engineDisplacement', this.carForm.value.engineDisplacement);
    carData.append('transitionType', this.carForm.value.transitionType);
    carData.append('equipment', this.carForm.value.equipment);
    carData.append('sellerPhone', this.carForm.value.sellerPhone);
    carData.append('sellerEmail', this.carForm.value.sellerEmail);
    carData.append('sellerComment', this.carForm.value.sellerComment);

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
        this.errMsg = err.error;
      },
    });
  }
  onFileSelect(event: any) {
    //     const files = (event.target as HTMLInputElement).files;
    // this.carForm.patchValue({ images: files });
    // const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    // Array.from(files).forEach((file) => {
    //   if (file && allowedMimeTypes.includes(file.type)) {
    //     // const reader = new FileReader();
    //     // reader.onload = () => {
    //     //   this.imageData.push(reader.result as string);
    //     // };
    //     // reader.readAsDataURL(file);
    //   }
    // });
    this.imageCount = event.target.files.length;
    for (var i = 0; i < this.imageCount; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  onBrandSelect(event): void {
    const index = event.target.value.toString().split(':')[0];
    this.selectedModelData = this.carViewData[index].models;
  }
  appendEquipment() {
    if (this.eq != '') {
      this.equipment.push(this.eq);
      this.eq = '';
    }
  }
  removeEquipment(i: number) {
    this.equipment.splice(i, 1);
  }
  changeModelMsg() {
    this.modelMsg = 'Please select brand first.';
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
