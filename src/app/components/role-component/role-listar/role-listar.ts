import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role-service';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-role-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './role-listar.html',
  styleUrl: './role-listar.css',
})
export class RoleListar implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Role> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;
  esCliente: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: RoleService, private router: Router, private loginService: LoginService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const rol = this.loginService.showRole();
    this.esCliente = JSON.stringify(rol).includes('CLIENTE');
    if (!this.esCliente) {
      this.cargar();
      this.routerSub = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) { this.cargar(); }
      });
    }
  }

  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.cS.delete(id).subscribe({
        next: () => { this.cargar(); },
        error: (err) => {
          const msg = err?.error || 'No se puede eliminar este registro.';
          this.snackBar.open(msg, 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      });
    }
  }
}
