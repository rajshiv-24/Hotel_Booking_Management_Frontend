import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { JwtInterceptor }    from './interceptors/jwt.interceptor';
import { BookingFilterPipe } from './pipes/booking-filter.pipe';
import { NavbarComponent }          from './components/navbar/navbar.component';
import { LoginComponent }           from './components/login/login.component';
import { RegisterComponent }        from './components/register/register.component';
import { HomeComponent }            from './components/home/home.component';
import { RoomsComponent }           from './components/rooms/rooms.component';
import { MyBookingsComponent }      from './components/my-bookings/my-bookings.component';
import { AdminDashboardComponent }  from './components/admin-dashboard/admin-dashboard.component';
import { AdminRoomsComponent }      from './components/admin-rooms/admin-rooms.component';
import { AdminBookingsComponent }   from './components/admin-bookings/admin-bookings.component';
import { AdminCustomersComponent }  from './components/admin-customers/admin-customers.component';

@NgModule({
  declarations: [
    AppComponent, BookingFilterPipe,
    NavbarComponent, LoginComponent, RegisterComponent,
    HomeComponent, RoomsComponent, MyBookingsComponent,
    AdminDashboardComponent, AdminRoomsComponent,
    AdminBookingsComponent, AdminCustomersComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
