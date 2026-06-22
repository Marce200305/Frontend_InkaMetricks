import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';

@Component({
  selector: 'app-canal-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './canal-listar.html',
  styleUrl: './canal-listar.css',
})
export class CanalListar implements OnInit {
  dataSource: MatTableDataSource<Canal> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private cS: CanalService, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  eliminar(id: number) {
    const confirmado = confirm('¿Estás seguro de eliminar este canal?\nSe eliminarán también sus transmisiones, métricas y registros de monitoreo asociados.');
    if (confirmado) {
      this.cS.delete(id).subscribe(() => { this.cargar(); });
    }
  }
}
