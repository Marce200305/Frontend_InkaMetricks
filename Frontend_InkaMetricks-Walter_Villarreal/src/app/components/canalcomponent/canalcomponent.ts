import { Component } from '@angular/core';
import {ActivatedRoute,RouterOutlet} from '@angular/router';
import { CanalList } from './canal-list/canal-list';

@Component({
  selector: 'app-canalcomponent',
  imports: [RouterOutlet,CanalList],
  templateUrl: './canalcomponent.html',
  styleUrl: './canalcomponent.css',
})
export class Canalcomponent {
  constructor(public route:ActivatedRoute){}
}
