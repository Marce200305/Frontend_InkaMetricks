import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Broadcast } from '../../../models/Broadcast';
import { BroadcastService } from '../../../services/broadcast-service';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';

@Component({
  selector: 'app-broadcast-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './broadcast-list.html',
  styleUrl: './broadcast-list.css',
})
export class BroadcastList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Broadcast> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  listaChannels: Channel[] = [];
  private routerSub?: Subscription;

  constructor(private cS: BroadcastService, private channelS: ChannelService, private router: Router) {}

  ngOnInit(): void {
    this.channelS.list().subscribe(data => { this.listaChannels = data; });
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  getChannel(id: number): string {
    return this.listaChannels.find(c => c.id === id)?.channelUrl || '—';
  }

  delete(id: number) {
    if (confirm('⚠️ Al eliminar esta Transmisión se eliminarán también:\n→ Métricas Snapshot asociadas\n→ Detecciones Publicitarias asociadas\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
