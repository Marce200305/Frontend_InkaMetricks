import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CompanyList } from './company-list/company-list';

@Component({
  selector: 'app-company-component',
  imports: [RouterOutlet, CompanyList],
  templateUrl: './company-component.html',
  styleUrl: './company-component.css',
})
export class CompanyComponent {
  constructor(public route: ActivatedRoute) {}
}
