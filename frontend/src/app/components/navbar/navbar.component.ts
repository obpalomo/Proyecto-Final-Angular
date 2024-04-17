import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });
  }

  onLogout(){
    this.userService.logout();
  }

}
