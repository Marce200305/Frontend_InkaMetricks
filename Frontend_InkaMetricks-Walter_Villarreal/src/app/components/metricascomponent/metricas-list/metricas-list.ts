import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Metricasservice } from '../../../services/metricasservice';
import { Metricas } from '../../../models/Metricas';

@Component({
  selector: 'app-metricas-list',
  imports: [MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule],
  templateUrl: './metricas-list.html',
  styleUrl: './metricas-list.css',
})
export class MetricasList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Metricas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;

  constructor(
    private mS: Metricasservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMetricas();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.loadMetricas(); }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  loadMetricas() {
    this.mS.list().subscribe({
      next: (data) => { this.dataSource.data = data; }
    });
  }

  delete(id: number) {
    this.mS.delete(id).subscribe((data) => {
      this.mS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }

}
