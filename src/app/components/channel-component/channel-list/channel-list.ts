import { ChangeDetectorRef, Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';
import { Platform } from '../../../models/Platform';
import { PlatformService } from '../../../services/platform-service';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';

@Component({
  selector: 'app-channel-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './channel-list.html',
  styleUrl: './channel-list.css',
})
export class ChannelList implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Channel> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  platformDataMap: Map<number, StreamingPlatformData> = new Map();
  listaPlatforms: Platform[] = [];
  listaStreamers: Streamer[] = [];

  constructor(private cS: ChannelService, private platformS: PlatformService, private streamerS: StreamerService, private router: Router, private cdRef: ChangeDetectorRef, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.platformS.list().subscribe(data => { this.listaPlatforms = data; this.cdRef.detectChanges(); });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; this.cdRef.detectChanges(); });
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }

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
