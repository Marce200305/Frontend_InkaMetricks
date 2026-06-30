import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menucomponent',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule, RouterLink
  ],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {}
