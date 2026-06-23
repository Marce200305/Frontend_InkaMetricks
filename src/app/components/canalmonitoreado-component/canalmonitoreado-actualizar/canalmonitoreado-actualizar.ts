import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

@Component({
  selector: 'app-canalmonitoreado-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './canalmonitoreado-actualizar.html',
  styleUrl: './canalmonitoreado-actualizar.css',
})
export class CanalmonitoreadoActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: CanalMonitoreado = new CanalMonitoreado();
  id: number = 0;
  listaCanales: Canal[] = [];
  listaEmpresas: Empresa[] = [];

  constructor(
    private cS: CanalmonitoreadoService,
    private canalS: CanalService,
    private empresaS: EmpresaService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.canalS.list().subscribe(data => { this.listaCanales = data; });
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      canal: [null, Validators.required],
      empresa: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idCanalMonitoreado,
        canal: data.canal,
        empresa: data.empresa,
      });
    });
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idCanalMonitoreado = this.form.value.codigo;
      this.obj.canal = this.form.value.canal;
      this.obj.empresa = this.form.value.empresa;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/canales-monitoreados/lista']); } });
    }
  }
}
