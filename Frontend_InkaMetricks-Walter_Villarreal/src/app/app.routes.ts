import { Routes } from '@angular/router';

import { Canalcomponent } from './components/canalcomponent/canalcomponent';
import { CanalInsert } from './components/canalcomponent/canal-insert/canal-insert';
import { CanalList } from './components/canalcomponent/canal-list/canal-list';
import { CanalUpdate } from './components/canalcomponent/canal-update/canal-update';

import { Canalmonitoreadocomponent } from './components/canalmonitoreadocomponent/canalmonitoreadocomponent';
import { CanalmonitoreadoInsert } from './components/canalmonitoreadocomponent/canalmonitoreado-insert/canalmonitoreado-insert';
import { CanalmonitoreadoList } from './components/canalmonitoreadocomponent/canalmonitoreado-list/canalmonitoreado-list';
import { CanalmonitoreadoUpdate } from './components/canalmonitoreadocomponent/canalmonitoreado-update/canalmonitoreado-update';

import { Deteccionpublicitariacomponent } from './components/deteccionpublicitariacomponent/deteccionpublicitariacomponent';
import { DeteccionpublicitariaInsert } from './components/deteccionpublicitariacomponent/deteccionpublicitaria-insert/deteccionpublicitaria-insert';
import { DeteccionpublicitariaList } from './components/deteccionpublicitariacomponent/deteccionpublicitaria-list/deteccionpublicitaria-list';
import { DeteccionpublicitariaUpdate } from './components/deteccionpublicitariacomponent/deteccionpublicitaria-update/deteccionpublicitaria-update';

import { Empresacomponent } from './components/empresacomponent/empresacomponent';
import { EmpresaInsert } from './components/empresacomponent/empresa-insert/empresa-insert';
import { EmpresaList } from './components/empresacomponent/empresa-list/empresa-list';
import { EmpresaUpdate } from './components/empresacomponent/empresa-update/empresa-update';

import { Marcacomponent } from './components/marcacomponent/marcacomponent';
import { MarcaInsert } from './components/marcacomponent/marca-insert/marca-insert';
import { MarcaList } from './components/marcacomponent/marca-list/marca-list';
import { MarcaUpdate } from './components/marcacomponent/marca-update/marca-update';

import { Metricascomponent } from './components/metricascomponent/metricascomponent';
import { MetricasInsert } from './components/metricascomponent/metricas-insert/metricas-insert';
import { MetricasList } from './components/metricascomponent/metricas-list/metricas-list';
import { MetricasUpdate } from './components/metricascomponent/metricas-update/metricas-update';

import { Plancomponent } from './components/plancomponent/plancomponent';
import { PlanInsert } from './components/plancomponent/plan-insert/plan-insert';
import { PlanList } from './components/plancomponent/plan-list/plan-list';
import { PlanUpdate } from './components/plancomponent/plan-update/plan-update';

import { Plataformacomponent } from './components/plataformacomponent/plataformacomponent';
import { PlataformaInsert } from './components/plataformacomponent/plataforma-insert/plataforma-insert';
import { PlataformaList } from './components/plataformacomponent/plataforma-list/plataforma-list';
import { PlataformaUpdate } from './components/plataformacomponent/plataforma-update/plataforma-update';

import { Regioncomponent } from './components/regioncomponent/regioncomponent';
import { RegionInsert } from './components/regioncomponent/region-insert/region-insert';
import { RegionList } from './components/regioncomponent/region-list/region-list';
import { RegionUpdate } from './components/regioncomponent/region-update/region-update';

import { Rolecomponent } from './components/rolecomponent/rolecomponent';
import { RoleInsert } from './components/rolecomponent/role-insert/role-insert';
import { RoleList } from './components/rolecomponent/role-list/role-list';
import { RoleUpdate } from './components/rolecomponent/role-update/role-update';

import { Streamercomponent } from './components/streamercomponent/streamercomponent';
import { StreamerInsert } from './components/streamercomponent/streamer-insert/streamer-insert';
import { StreamerList } from './components/streamercomponent/streamer-list/streamer-list';
import { StreamerUpdate } from './components/streamercomponent/streamer-update/streamer-update';

import { Transmisioncomponent } from './components/transmisioncomponent/transmisioncomponent';
import { TransmisionInsert } from './components/transmisioncomponent/transmision-insert/transmision-insert';
import { TransmisionList } from './components/transmisioncomponent/transmision-list/transmision-list';
import { TransmisionUpdate } from './components/transmisioncomponent/transmision-update/transmision-update';

import { Usercomponent } from './components/usercomponent/usercomponent';
import { UserInsert } from './components/usercomponent/user-insert/user-insert';
import { UserUpdate } from './components/usercomponent/user-update/user-update';
import { UserList } from './components/usercomponent/user-list/user-list';

import { Homecomponent } from './components/homecomponent/homecomponent';

export const routes: Routes = [
    { path: '', redirectTo: 'homes', pathMatch: 'full' },
    { path: 'homes', component: Homecomponent },

    {
        path: 'canales', component: Canalcomponent,
        children: [
            { path: 'nuevo', component: CanalInsert },
            { path: 'lista', component: CanalList },
            { path: 'editar/:id', component: CanalUpdate },
        ]
    },
    {
        path: 'canales-monitoreados', component: Canalmonitoreadocomponent,
        children: [
            { path: 'nuevo', component: CanalmonitoreadoInsert },
            { path: 'lista', component: CanalmonitoreadoList },
            { path: 'editar/:id', component: CanalmonitoreadoUpdate },
        ]
    },
    {
        path: 'detecciones-publicitarias', component: Deteccionpublicitariacomponent,
        children: [
            { path: 'nuevo', component: DeteccionpublicitariaInsert },
            { path: 'lista', component: DeteccionpublicitariaList },
            { path: 'editar/:id', component: DeteccionpublicitariaUpdate },
        ]
    },
    {
        path: 'empresas', component: Empresacomponent,
        children: [
            { path: 'nuevo', component: EmpresaInsert },
            { path: 'lista', component: EmpresaList },
            { path: 'editar/:id', component: EmpresaUpdate },
        ]
    },
    {
        path: 'marcas', component: Marcacomponent,
        children: [
            { path: 'nuevo', component: MarcaInsert },
            { path: 'lista', component: MarcaList },
            { path: 'editar/:id', component: MarcaUpdate },
        ]
    },
    {
        path: 'metricas', component: Metricascomponent,
        children: [
            { path: 'nuevo', component: MetricasInsert },
            { path: 'lista', component: MetricasList },
            { path: 'editar/:id', component: MetricasUpdate },
        ]
    },
    {
        path: 'planes', component: Plancomponent,
        children: [
            { path: 'nuevo', component: PlanInsert },
            { path: 'lista', component: PlanList },
            { path: 'editar/:id', component: PlanUpdate },
        ]
    },
    {
        path: 'plataformas', component: Plataformacomponent,
        children: [
            { path: 'nuevo', component: PlataformaInsert },
            { path: 'lista', component: PlataformaList },
            { path: 'editar/:id', component: PlataformaUpdate },
        ]
    },
    {
        path: 'regiones', component: Regioncomponent,
        children: [
            { path: 'nuevo', component: RegionInsert },
            { path: 'lista', component: RegionList },
            { path: 'editar/:id', component: RegionUpdate },
        ]
    },
    {
        path: 'roles', component: Rolecomponent,
        children: [
            { path: 'nuevo', component: RoleInsert },
            { path: 'lista', component: RoleList },
            { path: 'editar/:id', component: RoleUpdate },
        ]
    },
    {
        path: 'streamers', component: Streamercomponent,
        children: [
            { path: 'nuevo', component: StreamerInsert },
            { path: 'lista', component: StreamerList },
            { path: 'editar/:id', component: StreamerUpdate },
        ]
    },
    {
        path: 'transmisiones', component: Transmisioncomponent,
        children: [
            { path: 'nuevo', component: TransmisionInsert },
            { path: 'lista', component: TransmisionList },
            { path: 'editar/:id', component: TransmisionUpdate },
        ]
    },
    {
        path: 'usuarios', component: Usercomponent,
        children: [
            { path: 'nuevo', component: UserInsert },
            { path: 'lista', component: UserList },
            { path: 'editar/:id', component: UserUpdate },
        ]
    },
];
