import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Transmision } from '../../../models/Transmision';
import { TransmisionService } from '../../../services/transmision-service';

@Component({
  selector: 'app-transmision-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './transmision-listar.html',
  styleUrl: './transmision-listar.css',
})
export class TransmisionListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Transmision> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  private routerSub?: Subscription;

  constructor(
    private cS: TransmisionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({
      next: (data) => { this.dataSource.data = data; }
    });
  }

  eliminar(id: number) {
    if (confirm('⚠️ Al eliminar esta Transmisión se eliminarán también:\n→ Métricas Snapshot asociadas\n→ Detecciones Publicitarias asociadas\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
