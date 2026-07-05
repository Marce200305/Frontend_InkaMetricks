import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { CanalMonitoreado } from '../../../models/CanalMonitoreado';
import { Canalmonitoreadoservice } from '../../../services/canalmonitoreadoservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-canalmonitoreado-list',
  imports: [MatTableModule, 
    MatButtonModule, MatIconModule, 
    CommonModule, ReactiveFormsModule, 
    RouterLink],
  templateUrl: './canalmonitoreado-list.html',
  styleUrl: './canalmonitoreado-list.css',
})
export class CanalmonitoreadoList implements OnInit, OnDestroy {
  dataSource:MatTableDataSource<CanalMonitoreado> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  private routerSub?: Subscription;

  constructor(private clMS: Canalmonitoreadoservice,
    private router: Router){}
  
  ngOnInit(): void {
    this.loadChannelsMonit();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadChannelsMonit();
      }
    })
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  loadChannelsMonit(){
    this.clMS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    })
  }

  delete(id:number){
    this.clMS.delete(id).subscribe((data)=>{
      this.clMS.list().subscribe((data)=>{
        this.dataSource.data=data;
      });
    });
  }
}
