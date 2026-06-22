import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Canal } from '../../../models/Canal';
import { CanalService } from '../../../services/canal-service';
import { Plataforma } from '../../../models/Plataforma';
import { PlataformaService } from '../../../services/plataforma-service';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';

@Component({
  selector: 'app-canal-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './canal-insertar.html',
  styleUrl: './canal-insertar.css',
})
export class CanalInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Canal = new Canal();
  listaPlataformas: Plataforma[] = [];
  listaStreamers: Streamer[] = [];

  constructor(
    private cS: CanalService,
    private plataformaS: PlataformaService,
    private streamerS: StreamerService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.plataformaS.list().subscribe(data => { this.listaPlataformas = data; this.cdr.detectChanges(); });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      urlCanal: ['', Validators.required],
      seguidoresActuales: [0],
      plataforma: [null, Validators.required],
      streamer: [null],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.urlCanal = this.form.value.urlCanal;
      this.obj.seguidoresActuales = this.form.value.seguidoresActuales;
      this.obj.plataforma = this.form.value.plataforma;
      this.obj.streamer = this.form.value.streamer;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/canales/lista']); } });
    }
  }
}
