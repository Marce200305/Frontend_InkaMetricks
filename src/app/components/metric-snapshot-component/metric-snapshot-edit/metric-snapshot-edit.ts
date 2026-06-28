import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MetricSnapshot } from '../../../models/MetricSnapshot';
import { MetricSnapshotService } from '../../../services/metric-snapshot-service';
import { Broadcast } from '../../../models/Broadcast';
import { BroadcastService } from '../../../services/broadcast-service';

@Component({
  selector: 'app-metric-snapshot-edit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './metric-snapshot-edit.html',
  styleUrl: './metric-snapshot-edit.css',
})
export class MetricSnapshotEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: MetricSnapshot = new MetricSnapshot();
  id: number = 0;
  listaBroadcasts: Broadcast[] = [];
  metricNames: string[] = ['viewers', 'likes', 'comments', 'shares', 'followers'];

  constructor(
    private cS: MetricSnapshotService,
    private broadcastS: BroadcastService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.broadcastS.list().subscribe(data => { this.listaBroadcasts = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      codigo: [''],
      name: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      broadcast: [null, Validators.required],
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        name: data.name,
        amount: data.amount,
        broadcast: data.broadcastId,
      });
      this.cdr.detectChanges();
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.name = this.form.value.name;
      this.obj.amount = this.form.value.amount;
      this.obj.broadcastId = this.form.value.broadcast;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/metrics/list']); } });
    }
  }
}
