import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';
import { Platform } from '../../../models/Platform';
import { PlatformService } from '../../../services/platform-service';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';
import { PlatformResolverService } from '../../../services/platform-resolver-service';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';

@Component({
  selector: 'app-channel-create',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatProgressSpinnerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './channel-create.html',
  styleUrl: './channel-create.css',
})
export class ChannelCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Channel = new Channel();
  listaPlatforms: Platform[] = [];
  listaStreamers: Streamer[] = [];
  buscando = false;
  datosPlataforma: StreamingPlatformData | null = null;
  errorBusqueda = '';

  constructor(
    private cS: ChannelService,
    private platformS: PlatformService,
    private streamerS: StreamerService,
    private resolver: PlatformResolverService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.platformS.list().subscribe(data => { this.listaPlatforms = data; this.cdr.detectChanges(); });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      channelUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(2048)]],
      currentFollowers: [0, [Validators.min(0)]],
      platform: [null, Validators.required],
      streamer: [null],
    });
  }

  buscarEnPlataforma(): void {
    const url: string = this.form.value.channelUrl?.trim();
    if (!url) return;

    this.buscando = true;
    this.datosPlataforma = null;
    this.errorBusqueda = '';

    this.resolver.resolve(url).subscribe({
      next: (data) => {
        this.buscando = false;
        if (data) {
          this.datosPlataforma = data;

          const platformMatch = this.listaPlatforms.find(p =>
            p.name?.toLowerCase().includes(data.plataforma.toLowerCase())
          ) ?? null;

          const streamerMatch = this.listaStreamers.find(s =>
            s.nickname?.toLowerCase() === data.slug?.toLowerCase() ||
            s.nickname?.toLowerCase() === data.displayName?.toLowerCase()
          ) ?? null;

          this.form.patchValue({
            currentFollowers: data.followers,
            platform: platformMatch?.id ?? null,
            streamer: streamerMatch?.id ?? null,
          });
        } else {
          this.errorBusqueda = 'No se encontró el canal en la plataforma';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.buscando = false;
        this.errorBusqueda = 'Error al buscar el canal';
        this.cdr.detectChanges();
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.channelUrl = this.form.value.channelUrl;
      this.obj.currentFollowers = this.form.value.currentFollowers;
      this.obj.platformId = this.form.value.platform;
      this.obj.streamerId = this.form.value.streamer;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/channels/list']); } });
    }
  }
}
