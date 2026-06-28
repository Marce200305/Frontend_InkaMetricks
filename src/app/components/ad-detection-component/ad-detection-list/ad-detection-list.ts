import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdDetection } from '../../../models/AdDetection';
import { AdDetectionService } from '../../../services/ad-detection-service';

@Component({
  selector: 'app-ad-detection-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './ad-detection-list.html',
  styleUrl: './ad-detection-list.css',
})
export class AdDetectionList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<AdDetection> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  private routerSub?: Subscription;

  constructor(private cS: AdDetectionService, private router: Router) {}

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
    if (confirm('Delete this ad detection?')) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
