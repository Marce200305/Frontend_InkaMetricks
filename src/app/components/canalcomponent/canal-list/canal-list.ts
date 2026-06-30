import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { Canal } from '../../../models/Canal';
import { Canalservice } from '../../../services/canalservice';
import { Subscription } from 'rxjs';
import { StreamingPlatformData } from '../../../models/StreamingPlatformData';

@Component({
  selector: 'app-canal-list',
  imports: [MatTableModule, 
    MatButtonModule, MatIconModule, 
    CommonModule, ReactiveFormsModule, 
    RouterLink],
  templateUrl: './canal-list.html',
  styleUrl: './canal-list.css',
})
export class CanalList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Canal> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
  private routerSub?: Subscription;

  platformDataMap: Map<number, StreamingPlatformData> = new Map();
  
  constructor(private cs:Canalservice, private router:Router){}

  ngOnInit(): void {
    this.loadChanels();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadChanels()
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  loadChanels() {
    this.cs.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    });
  }

  deleteChanels(idChanel:number) {
    this.cs.delete(idChanel).subscribe((data)=>{
      this.cs.list().subscribe((data)=>{
        this.dataSource.data=data;
      });
    });
  }
}
