import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { Empresa } from '../../../models/Empresa';
import { Empresaservice } from '../../../services/empresaservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-empresa-list',
  imports: [
    MatTableModule, 
    MatButtonModule, MatIconModule, 
    CommonModule, ReactiveFormsModule, 
    RouterLink
  ],
  templateUrl: './empresa-list.html',
  styleUrl: './empresa-list.css',
})
export class EmpresaList implements OnInit, OnDestroy{
  dataSource:MatTableDataSource<Empresa> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;

  constructor(private eS: Empresaservice,
    private router: Router) { }
  
  ngOnInit(): void {
    this.loadEnterprise();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadEnterprise()
      }
    })
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  loadEnterprise() {
    this.eS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    })
  }

  delete(id:number) {
    this.eS.delete(id).subscribe((data)=>{
      this.eS.list().subscribe((data)=>{
        this.dataSource.data=data;
      });
    });
  }
}
