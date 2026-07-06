import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Feature {
  icon: string;
  title: string;
  text: string;
}

interface Valor {
  icon: string;
  title: string;
  text: string;
}

interface Stat {
  icon: string;
  valor: string;
  etiqueta: string;
}

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  enviado = signal(false);
  formContacto: FormGroup;

  readonly stats: Stat[] = [
    { icon: 'monitor', valor: '1,200+', etiqueta: 'Canales monitoreados' },
    { icon: 'live_tv', valor: '45K', etiqueta: 'Transmisiones analizadas' },
    { icon: 'campaign', valor: '380', etiqueta: 'Marcas detectadas' },
    { icon: 'public', valor: '3', etiqueta: 'Plataformas integradas' },
  ];

  readonly features: Feature[] = [
    {
      icon: 'bar_chart',
      title: 'Métricas en tiempo real',
      text: 'Espectadores, horas vistas y engagement minuto a minuto de los canales peruanos.',
    },
    {
      icon: 'devices',
      title: 'Multiplataforma',
      text: 'Twitch, YouTube Live y Kick consolidados en un solo panel comparable.',
    },
    {
      icon: 'description',
      title: 'Reportes exportables',
      text: 'Informes claros para patrocinadores, agencias y equipos de marketing.',
    },
    {
      icon: 'api',
      title: 'API para agencias',
      text: 'Integra los datos directamente en tu CRM o sistema de inteligencia de negocio.',
    },
  ];

  readonly valores: Valor[] = [
    { icon: 'visibility', title: 'Transparencia', text: 'Datos verificables y una metodología clara para todos.' },
    { icon: 'lightbulb', title: 'Innovación', text: 'Herramientas modernas para un mercado en crecimiento.' },
    { icon: 'balance', title: 'Equidad', text: 'Métricas justas que nivelan la negociación de patrocinios.' },
    { icon: 'verified', title: 'Fiabilidad', text: 'Información consistente en la que puedes basar decisiones.' },
  ];

  constructor(private fb: FormBuilder) {
    this.formContacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      mensaje: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  enviar() {
    if (this.formContacto.invalid) {
      this.formContacto.markAllAsTouched();
      return;
    }
    // Sin backend de contacto: mostramos confirmación local.
    this.enviado.set(true);
    this.formContacto.reset();
  }
}
