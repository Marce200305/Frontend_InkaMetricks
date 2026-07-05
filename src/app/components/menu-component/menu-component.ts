import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-menu-component',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {
  esAdmin: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
    const rol = this.loginService.showRole();
    this.esAdmin = !!rol && JSON.stringify(rol).includes('ADMINISTRADOR');
  }

  cerrar() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
