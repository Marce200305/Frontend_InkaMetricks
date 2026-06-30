import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Marca } from '../../../models/Marca';
import { Marcaservice } from '../../../services/marcaservice';

@Component({
  selector: 'app-marca-list',
  imports: [MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule],
  templateUrl: './marca-list.html',
  styleUrl: './marca-list.css',
})
export class MarcaList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Marca> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;

  constructor(private marcaService: Marcaservice, private router: Router) { }

  ngOnInit(): void {
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.marcaService.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    this.marcaService.delete(id).subscribe((data) => {
      this.marcaService.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
