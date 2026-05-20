import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/models';

@Component({ selector: 'app-my-bookings', templateUrl: './my-bookings.component.html' })
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  errorMsg = ''; successMsg = ''; loading = false;

  constructor(private bookingService: BookingService) {}
  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.bookingService.getMyBookings().subscribe({
      next: (d) => { this.bookings = d; this.loading = false; },
      error: ()  => { this.errorMsg = 'Failed to load.'; this.loading = false; }
    });
  }

  cancel(id: number): void {
    if (!confirm('Cancel this booking?')) return;
    this.bookingService.cancelMyBooking(id).subscribe({
      next: () => { this.successMsg = 'Booking cancelled.'; this.load(); setTimeout(() => this.successMsg = '', 3000); },
      error: (err) => this.errorMsg = err.error?.message || 'Failed.'
    });
  }

  statusClass(s: string): string {
    return s === 'CONFIRMED' ? 'bg-success' : s === 'CANCELLED' ? 'bg-danger' : 'bg-secondary';
  }

  nights(ci: string, co: string): number {
    return Math.round((new Date(co).getTime() - new Date(ci).getTime()) / 86400000);
  }
}
