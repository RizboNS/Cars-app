import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(this._urlCars + '\\' + id).pipe(catchError(this.handleError))
  }
  createCar(car: Car, userId: string): Observable<Car> {
      return this.http.post<Car>(this._urlUsers + '\\' + userId + '\\cars', car)
        .pipe(catchError(this.handleError))
  }
  deleteCar(id: string): Observable<Car> {
    return this.http.delete<Car>(this._urlCars + '\\' + id)
  }
  updateCar(id: string, car: Car): Observable<Car> {
    return this.http.patch<Car>(this._urlCars + '\\' + id, car)
      .pipe(catchError(this.handleError))
  }

  private handleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
        alert('Client side error')
      } else {
        alert('Serrver side error')
      }
      return throwError(() => {})
    }
  
}
