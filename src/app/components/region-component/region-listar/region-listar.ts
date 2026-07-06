import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatPaginatorModule } from '@angular/material/paginator';

import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';

@Component({
  selector: 'app-region-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './region-listar.html',
  styleUrl: './region-listar.css',
})
export class RegionListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Region> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  private routerSub?: Subscription;

  // VARIABLE NUEVA PARA EL BUSCADOR
  nombreBuscar: string = '';

  constructor(private cS: RegionService, private router: Router) {}

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

  // MÉTODO NUEVO PARA EL BUSCADOR
  buscarPorNombre() {
    if (this.nombreBuscar.trim() !== '') {
      this.cS.buscarPorNombre(this.nombreBuscar).subscribe({
        next: (data) => { this.dataSource.data = data; },
        error: (err) => { this.dataSource.data = []; } 
      });
    } else {
      this.cargar();
    }
  }

  eliminar(id: number) {
    if (confirm('⚠️ Al eliminar esta Región se eliminarán también los elementos asociados.\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}