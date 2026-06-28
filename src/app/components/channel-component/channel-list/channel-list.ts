import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';
import { Platform } from '../../../models/Platform';
import { PlatformService } from '../../../services/platform-service';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';

@Component({
  selector: 'app-channel-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './channel-list.html',
  styleUrl: './channel-list.css',
})
export class ChannelList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Channel> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  private routerSub?: Subscription;

  platformDataMap: Map<number, StreamingPlatformData> = new Map();
  listaPlatforms: Platform[] = [];
  listaStreamers: Streamer[] = [];

  constructor(private cS: ChannelService, private platformS: PlatformService, private streamerS: StreamerService, private router: Router) {}

  ngOnInit(): void {
    this.platformS.list().subscribe(data => { this.listaPlatforms = data; });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; });
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.cS.list().subscribe({
      next: (data) => { this.dataSource.data = data; }
    });
  }

  getPlatform(id: number): string {
    return this.listaPlatforms.find(p => p.id === id)?.name || '—';
  }

  getStreamer(id: number): string {
    return this.listaStreamers.find(s => s.id === id)?.nickname || '—';
  }

  delete(id: number) {
    const confirmado = confirm('Al eliminar este Canal se eliminarán también:\n→ Transmisiones del canal\n→ Métricas y Detecciones de esas transmisiones\n→ Registros de Canal Monitoreado\n\n¿Deseas continuar?');
    if (confirmado) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
