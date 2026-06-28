import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Brand } from '../../../models/Brand';
import { BrandService } from '../../../services/brand-service';

@Component({
  selector: 'app-brand-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './brand-list.html',
  styleUrl: './brand-list.css',
})
export class BrandList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.brandService.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    if (confirm('⚠️ Al eliminar esta Marca se eliminarán también:\n→ Todas las Detecciones Publicitarias asociadas\n\n¿Deseas continuar?')) {
      this.brandService.delete(id).subscribe(() => { this.load(); });
    }
  }
}
