import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../services/booking.service';
import { RoomService } from '../../services/room.service';
import { Booking } from '../../models/models';
import { environment } from 'src/environments/environment';

@Component({ selector: 'app-admin-dashboard', templateUrl: './admin-dashboard.component.html' })
export class AdminDashboardComponent implements OnInit {
  totalRooms = 0; availableRooms = 0;
  totalBookings = 0; confirmedBookings = 0; cancelledBookings = 0;
  totalCustomers = 0; totalRevenue = 0;
  recentBookings: Booking[] = [];

  constructor(private bookingService: BookingService, private roomService: RoomService, private http: HttpClient) {}

  ngOnInit(): void {
    this.roomService.getAdminRooms().subscribe(rooms => {
      this.totalRooms = rooms.length;
      this.availableRooms = rooms.filter(r => r.available).length;
    });
    this.bookingService.getAllBookings().subscribe(bookings => {
      this.totalBookings     = bookings.length;
      this.confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED').length;
      this.cancelledBookings = bookings.filter(b => b.status === 'CANCELLED').length;
      this.totalRevenue      = bookings.filter(b => b.status === 'CONFIRMED').reduce((s, b) => s + (b.totalAmount || 0), 0);
      this.recentBookings    = bookings.slice(0, 5);
    });
    this.http.get<any[]>(`${environment.apiUrl}/api/admin/customers`).subscribe(c => this.totalCustomers = c.length);
  }

  statusClass(s: string): string {
    return s === 'CONFIRMED' ? 'bg-success' : s === 'CANCELLED' ? 'bg-danger' : 'bg-secondary';
  }

  pct(part: number, total: number): string {
    return total ? ((part / total) * 100).toFixed(0) + '%' : '0%';
  }
}
