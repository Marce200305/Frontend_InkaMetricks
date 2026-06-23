import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Plataforma } from '../../../models/Plataforma';
import { PlataformaService } from '../../../services/plataforma-service';

@Component({
  selector: 'app-plataforma-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './plataforma-listar.html',
  styleUrl: './plataforma-listar.css',
})
export class PlataformaListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Plataforma> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;

  constructor(private cS: PlataformaService, private router: Router) {}

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
    if (confirm('⚠️ Al eliminar esta Plataforma se eliminarán también:\n→ Canales asociados\n→ Transmisiones de esos canales\n→ Métricas y Detecciones de esas transmisiones\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
