import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';

@Component({
  selector: 'app-region-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './region-listar.html',
  styleUrl: './region-listar.css',
})
export class RegionListar implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Region> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  nombreBuscar: string = '';

  constructor(private cS: RegionService, private router: Router, private snackBar: MatSnackBar) {}

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

  buscarPorNombre() {
    if (this.nombreBuscar.trim() !== '') {
      this.cS.buscarPorNombre(this.nombreBuscar).subscribe({
        next: (data) => { this.dataSource.data = data; },
        error: () => {
          this.dataSource.data = [];
          this.snackBar.open('No se encontraron regiones con ese nombre.', 'Cerrar', { duration: 4000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      });
    } else {
      this.cargar();
    }
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
