import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Marca } from '../../../models/Marca';
import { MarcaService } from '../../../services/marca-service';

@Component({
  selector: 'app-marca-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './marca-listar.html',
  styleUrl: './marca-listar.css',
})
export class MarcaListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Marca> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;

  constructor(private marcaService: MarcaService, private router: Router) {}

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

  eliminar(id: number) {
    if (confirm('⚠️ Al eliminar esta Marca se eliminarán también:\n→ Todas las Detecciones Publicitarias asociadas\n\n¿Deseas continuar?')) {
      this.marcaService.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
