import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Broadcast } from '../../../models/Broadcast';
import { BroadcastService } from '../../../services/broadcast-service';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';
import { PlatformResolverService } from '../../../services/platform-resolver-service';

@Component({
  selector: 'app-broadcast-create',
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './broadcast-create.html',
  styleUrl: './broadcast-create.css',
})
export class BroadcastCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Broadcast = new Broadcast();
  listaChannels: Channel[] = [];
  buscando = false;
  mensajePlataforma = '';

  constructor(
    private cS: BroadcastService,
    private channelS: ChannelService,
    private resolver: PlatformResolverService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.channelS.list().subscribe(data => { this.listaChannels = data; });
    this.form = this.fb.group({
      streamTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      startDate: ['', Validators.required],
      endDate: [null],
      isLive: [false],
      canal: [null, Validators.required],
    });
  }

  alSeleccionarCanal(): void {
    const channelId: number = this.form.value.canal;
    const channel = this.listaChannels.find(c => c.id === channelId);
    if (!channel?.channelUrl) return;

    this.buscando = true;
    this.mensajePlataforma = '';

    this.resolver.resolve(channel.channelUrl).subscribe({
      next: (data) => {
        this.buscando = false;
        if (data?.isLive && data.stream) {
          this.form.patchValue({
            streamTitle: data.stream.title,
            isLive: true,
            startDate: data.stream.startedAt ? new Date(data.stream.startedAt) : null,
          });
          this.mensajePlataforma = `✓ En vivo: "${data.stream.title}" — ${data.stream.viewers.toLocaleString()} viewers`;
        } else if (data) {
          this.form.patchValue({ isLive: false });
          this.mensajePlataforma = `✓ Canal encontrado: ${data.displayName} — Sin transmisión activa`;
        }
      },
      error: () => {
        this.buscando = false;
        this.mensajePlataforma = '✗ No se pudo obtener datos de la plataforma';
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.streamTitle = this.form.value.streamTitle;
      this.obj.startDate = this.form.value.startDate;
      this.obj.endDate = this.form.value.endDate;
      this.obj.isLive = this.form.value.isLive;
      this.obj.channelId = this.form.value.canal;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/broadcasts/list']); } });
    }
  }
}
