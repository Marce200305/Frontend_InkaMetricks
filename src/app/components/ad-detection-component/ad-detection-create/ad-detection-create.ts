import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-ad-detection-create',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './ad-detection-create.html',
  styleUrl: './ad-detection-create.css',
})
export class AdDetectionCreate implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: AdDetection = new AdDetection();
  listaBroadcasts: Broadcast[] = [];
  listaBrands: Brand[] = [];

  constructor(
    private cS: AdDetectionService,
    private broadcastS: BroadcastService,
    private brandS: BrandService,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.broadcastS.list().subscribe(data => { this.listaBroadcasts = data; this.cdr.detectChanges(); });
    this.brandS.list().subscribe(data => { this.listaBrands = data; this.cdr.detectChanges(); });
    this.form = this.fb.group({
      type: ['', Validators.required],
      appearanceTime: ['', Validators.required],
      appearanceDurationSec: [0, [Validators.required, Validators.min(0)]],
      broadcast: [null, Validators.required],
      brand: [null, Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.obj.type = this.form.value.type;
      this.obj.appearanceTime = this.form.value.appearanceTime;
      this.obj.appearanceDurationSec = this.form.value.appearanceDurationSec;
      this.obj.broadcastId = this.form.value.broadcast;
      this.obj.brandId = this.form.value.brand;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/ad-detections/list']); } });
    }
  }
}
