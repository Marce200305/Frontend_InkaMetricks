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

import { Company } from '../../../models/Company'; 
import { CompanyService } from '../../../services/company-service';

@Component({
  selector: 'app-company-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './company-list.html', 
  styleUrl: './company-list.css',
})
export class CompanyList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Company> = new MatTableDataSource();
  
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']; 
  private routerSub?: Subscription;

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