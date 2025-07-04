import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent {

  constructor(private router: Router) { }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.router.navigate(['/login']);
    }
  }
}