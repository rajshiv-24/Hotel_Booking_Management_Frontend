import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private userApi = `${environment.apiUrl}/api/...`;
private adminApi = `${environment.apiUrl}/api/...`;
  constructor(private http: HttpClient) {}

  createBooking(data: any): Observable<Booking>       { return this.http.post<Booking>(this.userApi, data); }
  getMyBookings(): Observable<Booking[]>               { return this.http.get<Booking[]>(this.userApi); }
  cancelMyBooking(id: number): Observable<Booking>    { return this.http.put<Booking>(`${this.userApi}/${id}/cancel`, {}); }
  getAllBookings(): Observable<Booking[]>              { return this.http.get<Booking[]>(this.adminApi); }
  adminCancelBooking(id: number): Observable<Booking> { return this.http.put<Booking>(`${this.adminApi}/${id}/cancel`, {}); }
}
