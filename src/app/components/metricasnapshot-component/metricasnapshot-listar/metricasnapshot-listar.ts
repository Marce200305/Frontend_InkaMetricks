import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MetricasnapshotService } from '../../../services/metricasnapshot-service';
import { MetricaSnapshot } from '../../../models/MetricaSnapshot';


@Component({
  selector: 'app-metricasnapshot-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './metricasnapshot-listar.html',
  styleUrl: './metricasnapshot-listar.css',
})
export class MetricasnapshotListar {
  dataSource: MatTableDataSource<MetricaSnapshot> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private cS: MetricasnapshotService, private router: Router) { }

  ngOnInit(): void {
    this.cargarMetricas();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cargarMetricas();
      }
    });
  }
  cargarMetricas() {
    this.cS.list().subscribe({
      next: (data) => {

        this.dataSource.data = data;
      }
    });
  }
    eliminar(id: number) {
      if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        this.cS.delete(id).subscribe(() => { this.cargarMetricas(); });
      }
    }
}
