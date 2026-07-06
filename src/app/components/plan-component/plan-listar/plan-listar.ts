import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-plan-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './plan-listar.html',
  styleUrl: './plan-listar.css',
})
export class PlanListar implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Plan> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: PlanService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }
  // Nuevo metodo para cargar solo los de mayor precio
cargarMayorPrecio() {
    this.cS.listHigherPrice().subscribe({
      next: (data) => { this.dataSource.data = data; },
      error: (err) => {
        this.snackBar.open('Error al cargar planes de mayor precio', 'Cerrar', { duration: 3000 });
      }
    });
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
