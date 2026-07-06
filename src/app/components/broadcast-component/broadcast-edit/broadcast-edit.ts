import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { Broadcast } from '../../../models/Broadcast';
import { BroadcastService } from '../../../services/broadcast-service';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';

@Component({
  selector: 'app-broadcast-edit',
  providers: [provideNativeDateAdapter()],
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './broadcast-edit.html',
  styleUrl: './broadcast-edit.css',
})
export class BroadcastEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Broadcast = new Broadcast();
  id: number = 0;
  listaChannels: Channel[] = [];

  constructor(
    private cS: BroadcastService,
    private channelS: ChannelService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.channelS.list().subscribe(data => { this.listaChannels = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
    this.form = this.fb.group({
      codigo: [''],
      streamTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      startDate: ['', Validators.required],
      endDate: [null],
      isLive: [false],
      canal: [null, Validators.required],
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        streamTitle: data.streamTitle,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        isLive: data.isLive,
        canal: data.channelId,
      });
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.streamTitle = this.form.value.streamTitle;
      this.obj.startDate = this.form.value.startDate;
      this.obj.endDate = this.form.value.endDate;
      this.obj.isLive = this.form.value.isLive;
      this.obj.channelId = this.form.value.canal;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/broadcasts/list']); } });
    }
  }
}
