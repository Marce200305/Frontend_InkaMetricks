import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Empresa } from '../../../models/Empresa';
import { EmpresaService } from '../../../services/empresa-service';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-empresa-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './empresa-listar.html',
  styleUrl: './empresa-listar.css',
})
export class EmpresaListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  listaPlanes: Plan[] = [];
  private routerSub?: Subscription;

  constructor(private cS: EmpresaService, private planS: PlanService, private router: Router) {}

  ngOnInit(): void {
    this.planS.list().subscribe(data => { this.listaPlanes = data; });
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  getPlan(id: number): string {
    return this.listaPlanes.find(p => p.idPlan === id)?.nombre || '—';
  }

  eliminar(id: number) {
    if (confirm('⚠️ Al eliminar esta Empresa se eliminarán también:\n→ Usuarios de esa empresa y sus Roles\n→ Canales Monitoreados asociados\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
