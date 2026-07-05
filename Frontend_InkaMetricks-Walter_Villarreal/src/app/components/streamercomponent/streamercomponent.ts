import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { StreamerList } from './streamer-list/streamer-list';

@Component({
  selector: 'app-streamercomponent',
  imports: [RouterOutlet, StreamerList],
  templateUrl: './streamercomponent.html',
  styleUrl: './streamercomponent.css',
})
export class Streamercomponent {
  constructor(public route: ActivatedRoute) {}
}
