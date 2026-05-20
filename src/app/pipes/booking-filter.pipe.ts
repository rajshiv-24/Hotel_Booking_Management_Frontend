import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from '../models/models';

@Pipe({ name: 'bookingFilter' })
export class BookingFilterPipe implements PipeTransform {
  transform(bookings: Booking[], status: string): number {
    return bookings.filter(b => b.status === status).length;
  }
}
