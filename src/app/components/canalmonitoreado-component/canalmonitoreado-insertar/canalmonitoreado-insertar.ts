import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CanalMonitoreado } from '../../../models/CanalMonitoreado';
import { CanalmonitoreadoService } from '../../../services/canalmonitoreado-service';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';
import { Empresa } from '../../../models/Empresa';
import { EmpresaService } from '../../../services/empresa-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-canalmonitoreado-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './canalmonitoreado-insertar.html',
  styleUrl: './canalmonitoreado-insertar.css',
})
export class CanalmonitoreadoInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: CanalMonitoreado = new CanalMonitoreado();
  listaCanales: Canal[] = [];
  listaEmpresas: Empresa[] = [];

  constructor(
    private cS: CanalmonitoreadoService,
    private canalS: CanalService,
    private empresaS: EmpresaService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; this.cdr.detectChanges(); });
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      canal: [null, Validators.required],
      empresa: [null],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.canal = this.form.value.canal;
      this.obj.empresa = this.form.value.empresa;
      this.cS.insert(this.obj).subscribe({
        next: () => {
          this.http.post(`${environment.base}/api/sync/ejecutar`, {}).subscribe();
          this.router.navigate(['/canales-monitoreados/lista']);
        }
      });
    }
  }
}
