import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit, OnDestroy {
  private carId!: string;
  private routeSubscription: Subscription = new Subscription();

  private sub1: Subscription = new Subscription();
  isImageLoading = true;
  imagesToShow: any[] = [];
  public editToggle: boolean = false;
  public btnText: string = 'Edit Car';
  public seller!: any;
  public car: Car;

  constructor(
    private carService: CarService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateId();
    this.getCar();
  }
  getCar() {
    this.sub1 = this.carService.getCar(this.carId).subscribe((res) => {
      // Init form
      this.car = res;
      this.seller = res.seller;
      this.car.images.forEach((image) => {
        this.getCarImage(this.car._id, image._id);
      });
    });
  }
  updateId() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.carId = params['id'];
    });
  }
  editCarBtnToggle() {
    if (this.editToggle) {
      this.editToggle = false;
      this.btnText = 'Edit Car';
    } else {
      this.editToggle = true;
      this.btnText = 'View Car';
    }
  }
  getCarImage(carId, imageId) {
    this.isImageLoading = true;
    this.carService.getCarImage(carId, imageId).subscribe({
      next: (res) => {
        this.createImageFromBlob(res);
        this.isImageLoading = false;
      },
      error: (error) => {
        this.isImageLoading = false;
      },
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imagesToShow.push(reader.result);
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
