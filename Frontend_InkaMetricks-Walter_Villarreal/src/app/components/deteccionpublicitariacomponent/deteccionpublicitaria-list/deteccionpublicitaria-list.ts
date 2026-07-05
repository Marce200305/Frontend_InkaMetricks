import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { DeteccionPublicitaria } from '../../../models/DeteccionPublicitaria';
import { Deteccionpublicitariaservice } from '../../../services/deteccionpublicitariaservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deteccionpublicitaria-list',
  imports: [MatTableModule, 
    MatButtonModule, MatIconModule, 
    CommonModule, ReactiveFormsModule, 
    RouterLink],
  templateUrl: './deteccionpublicitaria-list.html',
  styleUrl: './deteccionpublicitaria-list.css',
})
export class DeteccionpublicitariaList implements OnInit, OnDestroy {
  dataSource:MatTableDataSource<DeteccionPublicitaria> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  private routerSub?: Subscription;

  constructor(private dpS: Deteccionpublicitariaservice,
    private router: Router) { }
  
  ngOnInit(): void {
    this.loadDetections();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.loadDetections(); }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  loadDetections(){
    this.dpS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    })
  }

  eliminar(id:number){
    this.dpS.delete(id).subscribe((data)=>{
      this.dpS.list().subscribe((data)=>{
        this.dataSource.data=data;
      });
    });
  }
}
