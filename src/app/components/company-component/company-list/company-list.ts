import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company-service';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-company-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './company-list.html',
  styleUrl: './company-list.css',
})
export class CompanyList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Company> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  listaPlanes: Plan[] = [];
  private routerSub?: Subscription;

  constructor(private cS: CompanyService, private planS: PlanService, private router: Router) {}

  ngOnInit(): void {
    this.planS.list().subscribe(data => { this.listaPlanes = data; });
    this.load();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.load(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  getPlan(id: number): string {
    return this.listaPlanes.find(p => p.id === id)?.name || '—';
  }

  delete(id: number) {
    if (confirm('⚠️ Al eliminar esta Empresa se eliminarán también:\n→ Usuarios de esa empresa y sus Roles\n→ Canales Monitoreados asociados\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
