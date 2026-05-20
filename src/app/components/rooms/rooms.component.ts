import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { BookingService } from '../../services/booking.service';
import { Room } from '../../models/models';

@Component({ selector: 'app-rooms', templateUrl: './rooms.component.html' })
export class RoomsComponent implements OnInit {
  rooms: Room[]     = [];
  filtered: Room[]  = [];
  selectedRoom: Room | null = null;
  bookingForm!: FormGroup;
  errorMsg   = '';
  successMsg = '';
  loading    = false;
  filterType = 'ALL';
  today = new Date().toISOString().split('T')[0];

  constructor(private roomService: RoomService, private bookingService: BookingService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      checkInDate:  ['', Validators.required],
      checkOutDate: ['', Validators.required]
    });
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (d) => { this.rooms = d; this.applyFilter(); },
      error: ()  => this.errorMsg = 'Failed to load rooms.'
    });
  }

  applyFilter(): void {
    this.filtered = this.filterType === 'ALL' ? this.rooms : this.rooms.filter(r => r.roomType === this.filterType);
  }

  setFilter(type: string): void { this.filterType = type; this.applyFilter(); }

  selectRoom(room: Room): void {
    if (!room.available) return;
    this.selectedRoom = room;
    this.successMsg = ''; this.errorMsg = '';
    this.bookingForm.reset();
    setTimeout(() => document.getElementById('bookingPanel')?.scrollIntoView({ behavior: 'smooth' }), 100);
  }

  confirmBooking(): void {
    if (this.bookingForm.invalid) { this.bookingForm.markAllAsTouched(); return; }
    this.loading = true;
    this.bookingService.createBooking({ roomId: this.selectedRoom!.id, ...this.bookingForm.value }).subscribe({
      next: (b) => {
        this.successMsg = `Room ${this.selectedRoom?.roomNumber} booked! Total: ₹${b.totalAmount}`;
        this.selectedRoom = null; this.bookingForm.reset(); this.loading = false; this.loadRooms();
      },
      error: (err) => { this.errorMsg = err.error?.message || 'Booking failed.'; this.loading = false; }
    });
  }

  bannerClass(type: string): string {
    return type === 'SUITE' ? 'room-banner-suite' : type === 'DOUBLE' ? 'room-banner-double' : 'room-banner-single';
  }

  roomIcon(type: string): string {
    return type === 'SUITE' ? '👑' : type === 'DOUBLE' ? '🛏️🛏️' : '🛏️';
  }

  get f() { return this.bookingForm.controls; }
}
