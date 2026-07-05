import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user-service';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatPaginatorModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  private routerSub?: Subscription;
  esCliente: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: UserService, private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    const rol = this.loginService.showRole();
    this.esCliente = JSON.stringify(rol).includes('CLIENTE');
    if (!this.esCliente) {
      this.load();
      this.routerSub = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) { this.load(); }
      });
    }
  }

  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }

  ngOnDestroy(): void { this.routerSub?.unsubscribe(); }

  load() {
    this.cS.list().subscribe({ next: (data) => { this.dataSource.data = data; } });
  }

  delete(id: number) {
    if (confirm('Delete this user?')) {
      this.cS.delete(id).subscribe(() => { this.load(); });
    }
  }
}
