import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  selector: 'app-canal-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './canal-actualizar.html',
  styleUrl: './canal-actualizar.css',
})
export class CanalActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Canal = new Canal();
  id: number = 0;
  listaPlataformas: Plataforma[] = [];
  listaStreamers: Streamer[] = [];

  constructor(
    private cS: CanalService,
    private plataformaS: PlataformaService,
    private streamerS: StreamerService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.plataformaS.list().subscribe(data => { this.listaPlataformas = data; });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      urlCanal: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(2048)]],
      seguidoresActuales: [0, [Validators.min(0)]],
      plataforma: [null, Validators.required],
      streamer: [null],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idCanal,
        urlCanal: data.urlCanal,
        seguidoresActuales: data.seguidoresActuales,
        plataforma: data.idPlataforma,
        streamer: data.idStreamer,
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.idCanal = this.form.value.codigo;
      this.obj.urlCanal = this.form.value.urlCanal;
      this.obj.seguidoresActuales = this.form.value.seguidoresActuales;
      this.obj.idPlataforma = this.form.value.plataforma;
      this.obj.idStreamer = this.form.value.streamer;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/canales/lista']); } });
    }
  }
}
