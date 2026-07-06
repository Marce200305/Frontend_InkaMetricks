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
import { MatPaginatorModule } from '@angular/material/paginator'; // El paginador que pidió la profe

// OJO: Valida que la importación del modelo apunte a la ruta correcta si cambió de nombre a Company
import { Company } from '../../../models/Company'; 
import { CompanyService } from '../../../services/company-service';

@Component({
  selector: 'app-company-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './company-listar.html',
  styleUrl: './company-listar.css',
})
export class CompanyListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Company> = new MatTableDataSource();
  
  // Cambiamos los nombres de las columnas a los nuevos definidos por Claude (c1 a c6)
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;

  // VARIABLE NUEVA PARA EL BUSCADOR
  idPlanBuscar: number = 0;

  constructor(private cS: CompanyService, private router: Router) {}

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
  buscarPorPlan() {
    if (this.idPlanBuscar > 0) {
      this.cS.buscarPorPlan(this.idPlanBuscar).subscribe({
        next: (data) => { this.dataSource.data = data; },
        error: (err) => { this.dataSource.data = []; } 
      });
    } else {
      this.cargar();
    }
  }

  eliminar(id: number) {
    if (confirm('⚠️ Al eliminar esta Empresa se eliminarán también los registros asociados.\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}