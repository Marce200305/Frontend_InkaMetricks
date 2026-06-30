import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Users } from '../../../models/Users';
import { Usersservice } from '../../../services/usersservice';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;

  constructor(private cS: Usersservice, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.cargar(); }
    });
  }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  cargar() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    this.cS.delete(id).subscribe((data) => {
      this.cS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
