import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }          from './components/login/login.component';
import { RegisterComponent }       from './components/register/register.component';
import { HomeComponent }           from './components/home/home.component';
import { RoomsComponent }          from './components/rooms/rooms.component';
import { MyBookingsComponent }     from './components/my-bookings/my-bookings.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminRoomsComponent }     from './components/admin-rooms/admin-rooms.component';
import { AdminBookingsComponent }  from './components/admin-bookings/admin-bookings.component';
import { AdminCustomersComponent } from './components/admin-customers/admin-customers.component';
import { AuthGuard }  from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '',            redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',       component: LoginComponent },
  { path: 'register',    component: RegisterComponent },
  { path: 'home',        component: HomeComponent,           canActivate: [AuthGuard] },
  { path: 'rooms',       component: RoomsComponent,          canActivate: [AuthGuard] },
  { path: 'my-bookings', component: MyBookingsComponent,     canActivate: [AuthGuard] },
  { path: 'admin',           component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/rooms',     component: AdminRoomsComponent,     canActivate: [AdminGuard] },
  { path: 'admin/bookings',  component: AdminBookingsComponent,  canActivate: [AdminGuard] },
  { path: 'admin/customers', component: AdminCustomersComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
