import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { MetricaSnapshot } from './models/MetricaSnapshot';
import { MetricasInsert } from './components/metricascomponent/metricas-insert/metricas-insert';
import { MetricasList } from './components/metricascomponent/metricas-list/metricas-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full',
    },
    {
        path: 'homes',
        component: Homecomponent,
    },
    {
        path: 'cursos',
        component: MetricaSnapshot,
        children: [
            { path: 'nuevo', component: MetricasInsert },
            { path: 'lista', component: MetricasList },
            // { path: 'edits/:id', component: Metrica },
            // { path: 'buscar', component: CursoBuscar }
        ]

    },
];
