import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';
import { Plataforma } from '../../../models/Plataforma';
import { PlataformaService } from '../../../services/plataforma-service';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';

@Component({
  selector: 'app-canal-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './canal-listar.html',
  styleUrl: './canal-listar.css',
})
export class CanalListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Canal> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  private routerSub?: Subscription;

  platformDataMap: Map<number, StreamingPlatformData> = new Map();
  listaPlataformas: Plataforma[] = [];
  listaStreamers: Streamer[] = [];

  constructor(private cS: CanalService, private plataformaS: PlataformaService, private streamerS: StreamerService, private router: Router) {}

  ngOnInit(): void {
    this.plataformaS.list().subscribe(data => { this.listaPlataformas = data; });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; });
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

  getPlataforma(id: number): string {
    return this.listaPlataformas.find(p => p.idPlataforma === id)?.nombre || '—';
  }

  getStreamer(id: number): string {
    return this.listaStreamers.find(s => s.idStreamer === id)?.nickname || '—';
  }

  eliminar(id: number) {
    const confirmado = confirm('Al eliminar este Canal se eliminarán también:\n→ Transmisiones del canal\n→ Métricas y Detecciones de esas transmisiones\n→ Registros de Canal Monitoreado\n\n¿Deseas continuar?');
    if (confirmado) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
