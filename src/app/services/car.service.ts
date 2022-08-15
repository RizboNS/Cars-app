import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private _urlCars: string = 'http://localhost:3000/cars'
  private _urlUsers = 'http://localhost:3000/users'
  constructor(
    private http: HttpClient
  ) { }

  getCars() {
    return this.http.get<Car[]>(this._urlCars)
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(this._urlCars + '\\' + id)
  }
  createCar(car: Car, userId: string): Observable<Car> {
      return this.http.post<Car>(this._urlUsers + '\\' + userId + '\\cars', car)
  }
  deleteCar(id: string): Observable<Car> {
    return this.http.delete<Car>(this._urlCars + '\\' + id)
  }
  updateCar(id: string, car: Car): Observable<Car> {
    return this.http.patch<Car>(this._urlCars + '\\' + id, car)
  }

}
