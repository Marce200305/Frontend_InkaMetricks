import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Plan } from '../../../models/Plan';
import { PlanService } from '../../../services/plan-service';

@Component({
  selector: 'app-plan-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './plan-listar.html',
  styleUrl: './plan-listar.css',
})
export class PlanListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Plan> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;

  constructor(private cS: PlanService, private router: Router) {}

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
    if (confirm('⚠️ Al eliminar este Plan se eliminarán también:\n→ Empresas con ese plan\n→ Usuarios de esas empresas y sus Roles\n→ Canales Monitoreados asociados\n\n¿Deseas continuar?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
