import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';

@Component({
  selector: 'app-region-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './region-listar.html',
  styleUrl: './region-listar.css',
})
export class RegionListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Region> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  private routerSub?: Subscription;

  constructor(private cS: RegionService, private router: Router) {}

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

  eliminar(id: number) {
    if (confirm('⚠️ Al eliminar esta Región se eliminarán también:\n→ Streamers de esa región\n→ Canales de esos streamers\n→ Transmisiones, Métricas y Detecciones asociadas\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
