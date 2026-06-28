import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CanalMonitoreado } from '../../../models/CanalMonitoreado';
import { CanalmonitoreadoService } from '../../../services/canalmonitoreado-service';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';
import { Empresa } from '../../../models/Empresa';
import { EmpresaService } from '../../../services/empresa-service';

@Component({
  selector: 'app-canalmonitoreado-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './canalmonitoreado-listar.html',
  styleUrl: './canalmonitoreado-listar.css',
})
export class CanalmonitoreadoListar implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<CanalMonitoreado> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  listaCanales: Canal[] = [];
  listaEmpresas: Empresa[] = [];
  private routerSub?: Subscription;

  constructor(private cS: CanalmonitoreadoService, private canalS: CanalService, private empresaS: EmpresaService, private router: Router) {}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; });
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; });
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  getCanal(id: number): string {
    return this.listaCanales.find(c => c.idCanal === id)?.urlCanal || '—';
  }

  getEmpresa(id: number): string {
    return this.listaEmpresas.find(e => e.idEmpresa === id)?.nombreComercial || '—';
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
