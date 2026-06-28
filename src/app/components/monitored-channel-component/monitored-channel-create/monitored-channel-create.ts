import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MonitoredChannel } from '../../../models/MonitoredChannel';
import { MonitoredChannelService } from '../../../services/monitored-channel-service';
import { Channel } from '../../../models/Channel';
import { ChannelService } from '../../../services/channel-service';
import { Company } from '../../../models/Company';
import { CompanyService } from '../../../services/company-service';

@Component({
  selector: 'app-monitored-channel-create',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './monitored-channel-create.html',
  styleUrl: './monitored-channel-create.css',
})
export class MonitoredChannelCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: MonitoredChannel = new MonitoredChannel();
  listaChannels: Channel[] = [];
  listaCompanies: Company[] = [];

  constructor(
    private cS: MonitoredChannelService,
    private channelS: ChannelService,
    private companyS: CompanyService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.channelS.list().subscribe(data => { this.listaChannels = data; this.cdr.detectChanges(); });
    this.companyS.list().subscribe(data => { this.listaCompanies = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      channel: [null, Validators.required],
      company: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.channelId = this.form.value.channel;
      this.obj.companyId = this.form.value.company;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/monitored-channels/list']); } });
    }
  }
}
