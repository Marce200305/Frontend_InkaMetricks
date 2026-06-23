import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeteccionPublicitaria } from '../../../models/DeteccionPublicitaria';
import { DeteccionpublicitariaService } from '../../../services/deteccionpublicitaria-service';

@Component({
  selector: 'app-deteccionpublicitaria-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './deteccionpublicitaria-listar.html',
  styleUrl: './deteccionpublicitaria-listar.css',
})
export class DeteccionpublicitariaListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<DeteccionPublicitaria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  private routerSub?: Subscription;

  constructor(private cS: DeteccionpublicitariaService, private router: Router) {}

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
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
