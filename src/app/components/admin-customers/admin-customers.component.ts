import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({ selector: 'app-admin-customers', templateUrl: './admin-customers.component.html' })
export class AdminCustomersComponent implements OnInit {

  customers: any[] = [];
  errorMsg   = '';
  successMsg = '';
  loading    = false;
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.http.get<any[]>(`${environment.apiUrl}/api/admin/customers`).subscribe({
      next:  (d) => { this.customers = d; this.loading = false; },
      error: ()  => { this.errorMsg = 'Failed to load customers.'; this.loading = false; }
    });
  }

  get filtered(): any[] {
    if (!this.searchTerm.trim()) return this.customers;
    const t = this.searchTerm.toLowerCase();
    return this.customers.filter(c =>
      c.fullName?.toLowerCase().includes(t) ||
      c.email?.toLowerCase().includes(t) ||
      c.phone?.includes(t)
    );
  }

  delete(id: number): void {
    if (!confirm('Delete this customer? This cannot be undone.')) return;
    this.http.delete(`${environment.apiUrl}/api/admin/customers/${id}`).subscribe({
      next: () => {
        this.successMsg = '✅ Customer deleted successfully.';
        this.load();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: () => this.errorMsg = 'Delete failed.'
    });
  }

  avatarLetter(name: string): string {
    return name?.charAt(0)?.toUpperCase() || '?';
  }
}
