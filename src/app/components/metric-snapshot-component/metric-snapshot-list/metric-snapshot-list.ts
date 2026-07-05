import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
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

  constructor(private cS: MetricSnapshotService, private router: Router) {}

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
    if (confirm('Delete this metric snapshot?')) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
