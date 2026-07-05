import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Region } from '../../../models/Region';
import { Regionservice } from '../../../services/regionservice';

@Component({
  selector: 'app-region-list',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './region-list.html',
  styleUrl: './region-list.css',
})
export class RegionList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Region> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  private routerSub?: Subscription;

  constructor(private cS: Regionservice, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }

}
