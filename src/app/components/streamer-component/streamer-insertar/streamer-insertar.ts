import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';
import { Region } from '../../../models/Region';
import { RegionService } from '../../../services/region-service';
import { PlatformResolverService } from '../../../services/platform-resolver-service';
import { YoutubeService } from '../../../services/youtube-service';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-streamer-insertar',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './streamer-insertar.html',
  styleUrl: './streamer-insertar.css',
})
export class StreamerInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Streamer = new Streamer();
  listaRegiones: Region[] = [];
  plataformaSeleccionada: 'twitch' | 'youtube' | 'kick' | '' = '';
  buscando = false;
  perfilEncontrado: StreamingPlatformData | null = null;
  errorBusqueda = '';

  constructor(
    private cS: StreamerService,
    private regionS: RegionService,
    private resolver: PlatformResolverService,
    private youtube: YoutubeService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.regionS.list().subscribe(data => {
      this.listaRegiones = data;
      this.cdr.markForCheck();
    });

    this.form = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9._-]+$/)]],
      gender: ['', Validators.required],
      registrationDate: ['', Validators.required],
      region: [null, Validators.required],
    });
  }

  buscarPerfil(): void {
    const nickname = this.form.value.nickname?.trim();
    if (!nickname || !this.plataformaSeleccionada) return;

    this.buscando = true;
    this.perfilEncontrado = null;
    this.errorBusqueda = '';

    if (this.plataformaSeleccionada === 'youtube') {
      this.youtube.searchChannel(nickname).pipe(
        map((res: any) => {
          const item = res?.items?.[0];
          if (!item) return null;
          const channelId = item.id?.channelId;
          return channelId ? `https://www.youtube.com/channel/${channelId}` : null;
        }),
        switchMap((url: string | null) => url ? this.resolver.resolve(url) : of(null))
      ).subscribe({
        next: (data) => {
          this.buscando = false;
          this.perfilEncontrado = data;
          if (data) {
            const regionMatch = data.country
              ? this.listaRegiones.find(r =>
                  r.name?.toLowerCase().includes(data.country!.toLowerCase()) ||
                  data.country!.toLowerCase().includes(r.name?.toLowerCase() ?? '')
                ) ?? null
              : null;
            this.form.patchValue({
              nickname: data.displayName ?? this.form.value.nickname,
              registrationDate: new Date(),
              ...(regionMatch ? { region: regionMatch.id } : {})
            });
          }
          this.cdr.markForCheck();
        },
        error: () => {
          this.buscando = false;
          this.errorBusqueda = 'No se encontró el perfil en YouTube';
          this.cdr.markForCheck();
        }
      });
      return;
    }

    const urlMap: Record<string, string> = {
      twitch: `https://www.twitch.tv/${nickname}`,
      kick: `https://kick.com/${nickname}`,
    };

    this.resolver.resolve(urlMap[this.plataformaSeleccionada]).subscribe({
      next: (data) => {
        this.buscando = false;
        this.perfilEncontrado = data;
        if (data) {
          this.form.patchValue({
            nickname: data.displayName ?? this.form.value.nickname,
            registrationDate: new Date(),
          });
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.buscando = false;
        this.errorBusqueda = 'No se encontró el perfil en la plataforma seleccionada';
        this.cdr.markForCheck();
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nickname = this.form.value.nickname;
      this.obj.gender = this.form.value.gender;
      this.obj.registrationDate = this.form.value.registrationDate;
      this.obj.regionId = this.form.value.region;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/streamers/list']); } });
    }
  }
}
