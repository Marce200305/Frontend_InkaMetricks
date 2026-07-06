import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PlanListar } from './plan-listar/plan-listar';

@Component({
  selector: 'app-plan-component',
  imports: [RouterOutlet, PlanListar],
  templateUrl: './plan-component.html',
  styleUrl: './plan-component.css',
})
export class PlanComponent {
  constructor(public route: ActivatedRoute) {}
}
