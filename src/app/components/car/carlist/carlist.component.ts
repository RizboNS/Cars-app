import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit, OnDestroy {
  @Input() carId!: string
  @Output() refreshUser = new EventEmitter()

  
  private sub1: Subscription = new Subscription()
  private sub2: Subscription = new Subscription()

  public seller!: any
  public car!: Car
  constructor(
    private carService: CarService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initCar()
  }
  onDelete() {
    this.sub1 = this.carService.deleteCar(this.carId).subscribe((res) => {
      this.refreshUser.emit()
    })
  }
  initCar() {
    this.sub2 = this.carService.getCar(this.carId)
      .subscribe((data) => {
        this.car = data
        this.seller = data.seller
      })
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }
}
