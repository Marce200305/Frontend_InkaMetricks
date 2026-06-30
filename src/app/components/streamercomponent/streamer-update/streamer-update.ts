import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Streamer } from '../../../models/Streamer';
import { Streamerservice } from '../../../services/streamerservice';
import { Region } from '../../../models/Region';
import { Regionservice } from '../../../services/regionservice';

@Component({
  selector: 'app-streamer-update',
  imports: [
    MatInputModule, MatButtonModule, MatIconModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './streamer-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './streamer-update.css',
})
export class StreamerUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Streamer = new Streamer();
  id: number = 0;
  listaRegiones: Region[] = [];

  constructor(private cS: Streamerservice, private regionS: Regionservice,
    private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.regionS.list().subscribe(data => { this.listaRegiones = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      nickname: ['', Validators.required],
      genero: ['', Validators.required],
      fechaRegistroApp: ['', Validators.required],
      region: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idStreamer,
        nickname: data.nickname,
        genero: data.genero,
        fechaRegistroApp: data.fechaRegistroApp,
        region: data.region,
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
      this.obj.idStreamer = this.form.value.codigo;
      this.obj.nickname = this.form.value.nickname;
      this.obj.genero = this.form.value.genero;
      this.obj.fechaRegistroApp = this.form.value.fechaRegistroApp;
      this.obj.region = this.form.value.region;
      this.cS.update(this.obj).subscribe({
        next: () => {
          this.router.navigate(['/streamers/lista']);
        }
      });
    }
  }
}
