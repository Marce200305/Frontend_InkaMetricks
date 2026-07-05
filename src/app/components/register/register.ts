import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  companyId: number | null = null;

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {}

  register() {
    if (!this.username || !this.password) {
      this.snackBar.open('Completa todos los campos', 'Cerrar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      return;
    }
    this.loginService.register({ username: this.username, password: this.password, companyId: this.companyId }).subscribe({
      next: () => {
        this.snackBar.open('Usuario registrado correctamente', 'Cerrar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackBar.open('Error al registrar. Verifica los datos.', 'Cerrar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }
    });
  }
}
