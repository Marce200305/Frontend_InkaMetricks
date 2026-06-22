import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';
import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';

@Component({
  selector: 'app-streamer-insertar',
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './streamer-insertar.html',
  styleUrl: './streamer-insertar.css',
})
export class StreamerInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Streamer = new Streamer();
  listaRegiones: Region[] = [];

  constructor(private cS: StreamerService, private regionS: RegionService, private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.regionS.list().subscribe(data => { this.listaRegiones = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      nickname: ['', Validators.required],
      genero: ['', Validators.required],
      fechaRegistroApp: ['', Validators.required],
      region: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nickname = this.form.value.nickname;
      this.obj.genero = this.form.value.genero;
      this.obj.fechaRegistroApp = this.form.value.fechaRegistroApp;
      this.obj.region = this.form.value.region;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/streamers/lista']); } });
    }
  }
}
