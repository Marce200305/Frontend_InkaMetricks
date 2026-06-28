import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AdDetection } from '../../../models/AdDetection';
import { AdDetectionService } from '../../../services/ad-detection-service';
import { Broadcast } from '../../../models/Broadcast';
import { BroadcastService } from '../../../services/broadcast-service';
import { Brand } from '../../../models/Brand';
import { BrandService } from '../../../services/brand-service';

@Component({
  selector: 'app-ad-detection-edit',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './ad-detection-edit.html',
  styleUrl: './ad-detection-edit.css',
})
export class AdDetectionEdit implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: AdDetection = new AdDetection();
  id: number = 0;
  listaBroadcasts: Broadcast[] = [];
  listaBrands: Brand[] = [];

  constructor(
    private cS: AdDetectionService,
    private broadcastS: BroadcastService,
    private brandS: BrandService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.broadcastS.list().subscribe(data => { this.listaBroadcasts = data; this.cdr.detectChanges(); });
    this.brandS.list().subscribe(data => { this.listaBrands = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      codigo: [''],
      type: ['', Validators.required],
      appearanceTime: ['', Validators.required],
      appearanceDurationSec: [0, [Validators.required, Validators.min(0)]],
      broadcast: [null, Validators.required],
      brand: [null, Validators.required],
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
        type: data.type,
        appearanceTime: data.appearanceTime,
        appearanceDurationSec: data.appearanceDurationSec,
        broadcast: data.broadcastId,
        brand: data.brandId,
      });
      this.cdr.detectChanges();
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.type = this.form.value.type;
      this.obj.appearanceTime = this.form.value.appearanceTime;
      this.obj.appearanceDurationSec = this.form.value.appearanceDurationSec;
      this.obj.broadcastId = this.form.value.broadcast;
      this.obj.brandId = this.form.value.brand;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/ad-detections/list']); } });
    }
  }
}
