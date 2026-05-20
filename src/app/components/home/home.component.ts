import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-home', templateUrl: './home.component.html' })
export class HomeComponent {
  constructor(public auth: AuthService) {}

  features = [
    { icon: '🛏️', title: 'Luxury Rooms',    desc: 'Single, Double and Suite rooms with premium amenities and stunning views.' },
    { icon: '⚡', title: 'Instant Booking',  desc: 'Book your room in seconds with real-time availability and instant confirmation.' },
    { icon: '🔒', title: 'Secure & Safe',    desc: 'Your data is protected with JWT authentication and industry-grade encryption.' },
    { icon: '📱', title: 'Easy Management',  desc: 'View and cancel your bookings anytime from the My Bookings page.' },
    { icon: '💰', title: 'Best Prices',      desc: 'Transparent pricing with no hidden charges. Total cost calculated instantly.' },
    { icon: '🌟', title: 'Premium Service',  desc: 'World-class service with 24/7 support to make your stay unforgettable.' }
  ];
}
