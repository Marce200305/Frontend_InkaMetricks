import { ChangeDetectorRef, Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';
import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';

@Component({
  selector: 'app-streamer-listar',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatPaginatorModule,
  ],
  templateUrl: './streamer-listar.html',
  styleUrl: './streamer-listar.css',
})
export class StreamerListar implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Streamer> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  listaRegiones: Region[] = [];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: StreamerService, private regionS: RegionService, private router: Router, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.regionS.list().subscribe(data => { this.listaRegiones = data; this.cdRef.detectChanges(); });
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({
      next: (data) => { this.dataSource.data = data; }
    });
  }

  getRegion(id: number): string {
    return this.listaRegiones.find(r => r.id === id)?.name || '—';
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
