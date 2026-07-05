import { ChangeDetectorRef, Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Broadcast } from '../../../models/Broadcast';
import { BroadcastService } from '../../../services/broadcast-service';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';

@Component({
  selector: 'app-broadcast-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './broadcast-list.html',
  styleUrl: './broadcast-list.css',
})
export class BroadcastList implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<Broadcast> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  listaChannels: Channel[] = [];
  private routerSub?: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: BroadcastService, private channelS: ChannelService, private router: Router, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.channelS.list().subscribe(data => { this.listaChannels = data; this.cdRef.detectChanges(); });
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

  getChannel(id: number): string {
    return this.listaChannels.find(c => c.id === id)?.channelUrl || '—';
  }

  delete(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
