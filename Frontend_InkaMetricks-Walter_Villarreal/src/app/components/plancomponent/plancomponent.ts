import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlanList } from './plan-list/plan-list';

@Component({
  selector: 'app-plancomponent',
  imports: [RouterOutlet, PlanList],
  templateUrl: './plancomponent.html',
  styleUrl: './plancomponent.css',
})
export class Plancomponent {
  constructor(public route: ActivatedRoute) {}
}
