import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AdDetectionList } from './ad-detection-list/ad-detection-list';

@Component({
  selector: 'app-ad-detection-component',
  imports: [RouterOutlet, AdDetectionList],
  templateUrl: './ad-detection-component.html',
  styleUrl: './ad-detection-component.css',
})
export class AdDetectionComponent {
  constructor(public route: ActivatedRoute) {}
}
