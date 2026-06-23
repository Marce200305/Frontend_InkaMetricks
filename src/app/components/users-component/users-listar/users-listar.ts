import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'app-users-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './users-listar.html',
  styleUrl: './users-listar.css',
})
export class UsersListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;

  constructor(private cS: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  eliminar(id: number) {
    if (confirm('⚠️ Al eliminar este Usuario se eliminarán también:\n→ Todos sus Roles asignados\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
