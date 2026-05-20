import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/models';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private userApi  = 'http://localhost:8080/api/user/rooms';
  private adminApi = 'http://localhost:8080/api/admin/rooms';
  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<Room[]>     { return this.http.get<Room[]>(`${this.userApi}/all`); }
  getAvailableRooms(): Observable<Room[]> { return this.http.get<Room[]>(this.userApi); }
  getAdminRooms(): Observable<Room[]>  { return this.http.get<Room[]>(this.adminApi); }
  createRoom(r: Room): Observable<Room>  { return this.http.post<Room>(this.adminApi, r); }
  updateRoom(id: number, r: Room): Observable<Room> { return this.http.put<Room>(`${this.adminApi}/${id}`, r); }
  deleteRoom(id: number): Observable<void> { return this.http.delete<void>(`${this.adminApi}/${id}`); }
}
