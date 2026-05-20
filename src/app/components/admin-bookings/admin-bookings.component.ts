import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/models';

@Component({ selector: 'app-admin-bookings', templateUrl: './admin-bookings.component.html' })
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  filtered: Booking[] = [];
  errorMsg = ''; successMsg = ''; loading = false;
  filterStatus = 'ALL';

  constructor(private bookingService: BookingService) {}
  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (d) => { this.bookings = d; this.applyFilter(); this.loading = false; },
      error: ()  => { this.errorMsg = 'Failed to load.'; this.loading = false; }
    });
  }

  applyFilter(): void {
    this.filtered = this.filterStatus === 'ALL' ? this.bookings : this.bookings.filter(b => b.status === this.filterStatus);
  }

  setFilter(s: string): void { this.filterStatus = s; this.applyFilter(); }

  cancel(id: number): void {
    if (!confirm('Cancel this booking?')) return;
    this.bookingService.adminCancelBooking(id).subscribe({
      next: () => { this.successMsg = '✅ Booking cancelled.'; this.load(); setTimeout(() => this.successMsg = '', 3000); },
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
