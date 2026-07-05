import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Canalservice } from '../../../services/canalservice';
import { Canal } from '../../../models/Canal';
import { CanalList } from '../canal-list/canal-list';
import { Plataforma } from '../../../models/Plataforma';
import { Plataformaservice } from '../../../services/plataformaservice';
import { Streamer } from '../../../models/Streamer';
import { Streamerservice } from '../../../services/streamerservice';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-canal-update',
  imports: [CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule, MatOption, MatSelect],
  templateUrl: './canal-update.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './canal-update.css',
})
export class CanalUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  cnl: Canal = new Canal();
  id: number = 0;
  listaPlataformas: Plataforma[] = [];
  listaStreamers: Streamer[] = [];

  constructor(private cnS: Canalservice,
    private router: Router, private formbuilder: FormBuilder,
    private route: ActivatedRoute, private plataformaS: Plataformaservice,
    private streamerS: Streamerservice) { }

  ngOnInit(): void {
    this.plataformaS.list().subscribe(data => { this.listaPlataformas = data; });
    this.streamerS.list().subscribe(data => { this.listaStreamers = data; });
    this.route.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.init()//
    })//

    this.form = this.formbuilder.group({
      id: [''],
      urlCanal: [
        '', Validators.required
      ],
      seguidoresActuales: [0],
      plataforma: [null, Validators.required],
      streamer: [null]
    });
  }

  acept() {
    if (this.form.valid) {
      this.cnl.idCanal = this.form.value.id;
      this.cnl.urlCanal = this.form.value.urlCanal;
      this.cnl.seguidoresActuales = this.form.value.seguidoresActuales;
      this.cnl.plataforma = this.form.value.plataforma;
      this.cnl.streamer = this.form.value.streamer;
      this.cnS.update(this.cnl).subscribe({
        next: () => {
          this.router.navigate(['/canales/lista'])
        }
      })
    }
  }

  init() {
    this.cnS.listId(this.id).subscribe(data=>{
      this.form.patchValue({
        id:data.idCanal,
        urlCanal:data.urlCanal,
        seguidoresActuales:data.seguidoresActuales,
        plataforma:data.plataforma,
        streamer:data.streamer
      })
    })
  }

  compareById(a: any, b: any): boolean {
    if (!a || !b) return a === b;
    const key = Object.keys(a).find(k => k.toLowerCase().startsWith('id'));
    return key ? a[key] === b[key] : a === b;
  }
}
