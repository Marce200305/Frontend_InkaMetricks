import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetricSnapshot } from '../../../models/MetricSnapshot';
import { MetricSnapshotService } from '../../../services/metric-snapshot-service';

@Component({
  selector: 'app-metric-snapshot-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './metric-snapshot-list.html',
  styleUrl: './metric-snapshot-list.css',
})
export class MetricSnapshotList implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<MetricSnapshot> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: MetricSnapshotService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.cS.delete(id).subscribe({
        next: () => { this.load(); },
        error: (err) => {
          const msg = err?.error || 'No se puede eliminar este registro.';
          this.snackBar.open(msg, 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      });
    }
  }
}
