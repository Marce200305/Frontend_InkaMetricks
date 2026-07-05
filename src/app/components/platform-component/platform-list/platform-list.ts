import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Platform } from '../../../models/Platform';
import { PlatformService } from '../../../services/platform-service';

@Component({
  selector: 'app-platform-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './platform-list.html',
  styleUrl: './platform-list.css',
})
export class PlatformList implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Platform> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: PlatformService, private router: Router) {}

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
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
