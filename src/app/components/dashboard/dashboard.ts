import { Component } from '@angular/core';
import { Report01 } from '../report01/report01';
import { Report02 } from '../report02/report02';

@Component({
  selector: 'app-dashboard',
  imports: [Report01, Report02],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {}
