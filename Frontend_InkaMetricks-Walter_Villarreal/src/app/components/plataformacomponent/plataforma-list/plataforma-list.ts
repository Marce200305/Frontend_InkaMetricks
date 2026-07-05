import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Plataforma } from '../../../models/Plataforma';
import { Plataformaservice } from '../../../services/plataformaservice';

@Component({
  selector: 'app-plataforma-list',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './plataforma-list.html',
  styleUrl: './plataforma-list.css',
})
export class PlataformaList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Plataforma> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;

  constructor(private cS: Plataformaservice, private router: Router) {}

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
