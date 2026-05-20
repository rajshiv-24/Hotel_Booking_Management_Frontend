import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private userApi  = 'http://localhost:8080/api/user/bookings';
  private adminApi = 'http://localhost:8080/api/admin/bookings';
  constructor(private http: HttpClient) {}

  createBooking(data: any): Observable<Booking>       { return this.http.post<Booking>(this.userApi, data); }
  getMyBookings(): Observable<Booking[]>               { return this.http.get<Booking[]>(this.userApi); }
  cancelMyBooking(id: number): Observable<Booking>    { return this.http.put<Booking>(`${this.userApi}/${id}/cancel`, {}); }
  getAllBookings(): Observable<Booking[]>              { return this.http.get<Booking[]>(this.adminApi); }
  adminCancelBooking(id: number): Observable<Booking> { return this.http.put<Booking>(`${this.adminApi}/${id}/cancel`, {}); }
}
