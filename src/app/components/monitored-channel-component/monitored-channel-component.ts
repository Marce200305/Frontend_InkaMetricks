import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { MonitoredChannelList } from './monitored-channel-list/monitored-channel-list';

@Component({
  selector: 'app-monitored-channel-component',
  imports: [RouterOutlet, MonitoredChannelList],
  templateUrl: './monitored-channel-component.html',
  styleUrl: './monitored-channel-component.css',
})
export class MonitoredChannelComponent {
  constructor(public route: ActivatedRoute) {}
}
