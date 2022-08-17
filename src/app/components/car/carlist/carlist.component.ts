import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  @Input() carId!: string
  @Output() refreshUser = new EventEmitter()
  public seller!: any
  public car!: Car
  constructor(
    private carService: CarService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.carService.getCar(this.carId)
      .subscribe((data) => {
        this.car = data
        this.seller = data.seller
      })
  }
  onDelete() {
    this.carService.deleteCar(this.carId).subscribe((res) => {
      this.refreshUser.emit()
    })
  }

}
