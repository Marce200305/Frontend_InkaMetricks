import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { StreamerListar } from './streamer-listar/streamer-listar';

@Component({
  selector: 'app-streamer-component',
  imports: [RouterOutlet, StreamerListar],
  templateUrl: './streamer-component.html',
  styleUrl: './streamer-component.css',
})
export class StreamerComponent {
  constructor(public route: ActivatedRoute) {}
}
