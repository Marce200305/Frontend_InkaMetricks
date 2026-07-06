import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';
import { Platform } from '../../../models/Platform';
import { PlatformService } from '../../../services/platform-service';
import { Streamer } from '../../../models/Streamer';
import { StreamerService } from '../../../services/streamer-service';

@Component({
  selector: 'app-channel-edit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './channel-edit.html',
  styleUrl: './channel-edit.css',
})
export class ChannelEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Channel = new Channel();
  id: number = 0;
  listaPlatforms: Platform[] = [];
  listaStreamers: Streamer[] = [];

  constructor(
    private cS: ChannelService,
    private platformS: PlatformService,
    private streamerS: StreamerService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.platformS.list().subscribe(data => { this.listaPlatforms = data; });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      channelUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/), Validators.maxLength(2048)]],
      currentFollowers: [0, [Validators.min(0)]],
      platform: [null, Validators.required],
      streamer: [null],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        channelUrl: data.channelUrl,
        currentFollowers: data.currentFollowers,
        platform: data.platformId,
        streamer: data.streamerId,
      });
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.channelUrl = this.form.value.channelUrl;
      this.obj.currentFollowers = this.form.value.currentFollowers;
      this.obj.platformId = this.form.value.platform;
      this.obj.streamerId = this.form.value.streamer;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/channels/list']); } });
    }
  }
}
