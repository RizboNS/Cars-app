import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {
  Bodys,
  CarViewData,
  Colors,
  FuelSystem,
  TransitionTypes,
} from 'src/app/assets/car-view-data';
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
  public seller!: any;
  public carForm!: FormGroup;

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
      this.carForm = this.fb.group({
        make: res.make,
        model: res.model,
        year: res.year,
        color: res.color,
        rangeDriven: res.rangeDriven,
        price: res.price,
        fuelSystem: res.fuelSystem,
        bodyType: res.bodyType,
        horsePower: res.horsePower,
        engineDisplacement: res.engineDisplacement,
        transitionType: res.transitionType,
        sellerPhone: res.sellerPhone,
        sellerEmail: [res.sellerEmail, [Validators.email]],
        sellerComment: res.sellerComment,
      });
      this.equipment = res.equipment;
      this.onModelLoad(res.make);
      this.seller = res.seller;
    });
  }
  updateId() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.carId = params['id'];
    });
  }
  onUpdate() {
    this.errMsg = '';
    this.carForm.value.equipment = this.equipment;
    const carFormData = new FormData();
    carFormData.append('make', this.carForm.value.make);
    carFormData.append('model', this.carForm.value.model);
    carFormData.append('year', this.carForm.value.year);
    carFormData.append('color', this.carForm.value.color);
    carFormData.append('rangeDriven', this.carForm.value.rangeDriven);
    carFormData.append('price', this.carForm.value.price);
    carFormData.append('fuelSystem', this.carForm.value.fuelSystem);
    carFormData.append('bodyType', this.carForm.value.bodyType);
    carFormData.append('horsePower', this.carForm.value.horsePower);
    carFormData.append(
      'engineDisplacement',
      this.carForm.value.engineDisplacement
    );
    carFormData.append('transitionType', this.carForm.value.transitionType);
    if (this.equipment.length > 0) {
      this.equipment.forEach((eq) => {
        carFormData.append('equipment', eq);
      });
    } else {
      carFormData.append('equipment', this.carForm.value.equipment);
    }
    carFormData.append('sellerPhone', this.carForm.value.sellerPhone);
    carFormData.append('sellerEmail', this.carForm.value.sellerEmail);
    carFormData.append('sellerComment', this.carForm.value.sellerComment);
    for (var i = 0; i < this.files.length; i++) {
      carFormData.append('images', this.files[i]);
    }
    // carFormData.forEach((el) => console.log('el: ', el));
    this.sub2 = this.carService.updateCar(this.carId, carFormData).subscribe({
      next: (res) => {
        if (res) alert('Succes');
      },
      error: (err) => {
        this.errMsg = err.error;
      },
    });
  }
  onBrandSelect(event): void {
    const index = event.target.value.toString().split(':')[0];
    this.selectedModelData = this.carViewData[index].models;
  }
  onModelLoad(brand: string): void {
    for (let i = 0; i < this.carViewData.length; i++) {
      const car = this.carViewData[i];
      if (car.name === brand) {
        this.selectedModelData = this.carViewData[i].models;
      }
    }
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
    this.routeSubscription.unsubscribe();
  }
}
