import { Component, OnInit } from '@angular/core';
import { JwtRequestDTO } from '../../models/JwtRequestDTO';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-authenticate',
    imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink],
    templateUrl: './authenticate.html',
    styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit {
    constructor(
        private loginService: LoginService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    username: string = '';
    password: string = '';

    ngOnInit(): void {}

    login() {
        const request = new JwtRequestDTO();
        request.username = this.username;
        request.password = this.password;

        this.loginService.login(request).subscribe({
            next: (data: any) => {
                sessionStorage.setItem('token', data.jwttoken);
                this.router.navigate(['homes']);
            },
            error: (error) => {
                console.log(error);
                if (error.status === 401) {
                    this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                    });
                } else {
                    this.snackBar.open('Ocurrió un error al iniciar sesión', 'Cerrar', {
                        duration: 3000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                    });
                }
            },
        });
    }
}
