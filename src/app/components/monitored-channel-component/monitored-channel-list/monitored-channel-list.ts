import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MonitoredChannel } from '../../../models/MonitoredChannel';
import { MonitoredChannelService } from '../../../services/monitored-channel-service';

@Component({
  selector: 'app-monitored-channel-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './monitored-channel-list.html',
  styleUrl: './monitored-channel-list.css',
})
export class MonitoredChannelList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<MonitoredChannel> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;

  constructor(private cS: MonitoredChannelService, private router: Router) {}

  ngOnInit(): void {
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    if (confirm('Delete this monitored channel?')) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
