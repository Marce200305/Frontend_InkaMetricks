import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brand } from '../../../models/Brand';
import { BrandService } from '../../../services/brand-service';

@Component({
  selector: 'app-brand-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css',
})
export class BrandList implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private brandService: BrandService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.brandService.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.brandService.delete(id).subscribe({
        next: () => { this.load(); },
        error: (err) => {
          const msg = err?.error || 'No se puede eliminar este registro.';
          this.snackBar.open(msg, 'Cerrar', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      });
    }
  }
}
