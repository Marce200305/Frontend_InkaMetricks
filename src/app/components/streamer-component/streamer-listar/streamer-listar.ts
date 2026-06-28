import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
  ],
  templateUrl: './streamer-listar.html',
  styleUrl: './streamer-listar.css',
})
export class StreamerListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Streamer> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  listaRegiones: Region[] = [];
  private routerSub?: Subscription;

  constructor(private cS: StreamerService, private regionS: RegionService, private router: Router) {}

  ngOnInit(): void {
    this.regionS.list().subscribe(data => { this.listaRegiones = data; });
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

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
    if (confirm('⚠️ Al eliminar este Streamer se eliminarán también:\n→ Canales asociados\n→ Transmisiones de esos canales\n→ Métricas y Detecciones de esas transmisiones\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
