export interface Room {
  id?: number;
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  available: boolean;
  description: string;
}
export interface User {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  role?: string;
}
export interface Booking {
  id?: number;
  room?: Room;
  user?: User;
  checkInDate: string;
  checkOutDate: string;
  status?: string;
  totalAmount?: number;
}
export interface AuthResponse {
  token: string;
  role: string;
  fullName: string;
  email: string;
}
