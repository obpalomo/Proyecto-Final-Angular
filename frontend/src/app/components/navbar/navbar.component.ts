import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']); // Navega a login cuando se clica el botón de logout
  }
}
