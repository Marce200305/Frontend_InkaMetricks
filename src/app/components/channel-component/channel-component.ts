import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ChannelList } from './channel-list/channel-list';

@Component({
  selector: 'app-channel-component',
  imports: [RouterOutlet, ChannelList],
  templateUrl: './channel-component.html',
  styleUrl: './channel-component.css',
})
export class ChannelComponent {
  constructor(public route: ActivatedRoute) {}
}
