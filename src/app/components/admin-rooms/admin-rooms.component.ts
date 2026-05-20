import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/models';

@Component({ selector: 'app-admin-rooms', templateUrl: './admin-rooms.component.html' })
export class AdminRoomsComponent implements OnInit {
  rooms: Room[] = [];
  form!: FormGroup;
  editingRoom: Room | null = null;
  errorMsg = ''; successMsg = '';

  constructor(private roomService: RoomService, private fb: FormBuilder) {}
  ngOnInit(): void { this.initForm(); this.load(); }

  initForm(r?: Room): void {
    this.form = this.fb.group({
      roomNumber:    [r?.roomNumber    || '', Validators.required],
      roomType:      [r?.roomType      || '', Validators.required],
      pricePerNight: [r?.pricePerNight || '', [Validators.required, Validators.min(1)]],
      available:     [r?.available     ?? true],
      description:   [r?.description   || '']
    });
  }

  load(): void {
    this.roomService.getAdminRooms().subscribe({
      next: (d) => this.rooms = d,
      error: ()  => this.errorMsg = 'Failed to load rooms.'
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const obs = this.editingRoom
      ? this.roomService.updateRoom(this.editingRoom.id!, this.form.value)
      : this.roomService.createRoom(this.form.value);
    obs.subscribe({
      next: () => {
        this.successMsg = this.editingRoom ? '✅ Room updated!' : '✅ Room created!';
        this.editingRoom = null; this.initForm(); this.load();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => this.errorMsg = err.error?.message || 'Operation failed.'
    });
  }

  edit(room: Room): void {
    this.editingRoom = room; this.initForm(room);
    document.getElementById('roomForm')?.scrollIntoView({ behavior: 'smooth' });
  }

  cancelEdit(): void { this.editingRoom = null; this.initForm(); }

  delete(id: number): void {
    if (!confirm('Delete this room?')) return;
    this.roomService.deleteRoom(id).subscribe({
      next: () => { this.successMsg = '✅ Room deleted!'; this.load(); },
      error: ()  => this.errorMsg = 'Delete failed. Room may have active bookings.'
    });
  }

  get f() { return this.form.controls; }
}
