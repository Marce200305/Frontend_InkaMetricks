import { Routes } from '@angular/router';

import { CanalComponent } from './components/canal-component/canal-component';
import { CanalInsertar } from './components/canal-component/canal-insertar/canal-insertar';
import { CanalListar } from './components/canal-component/canal-listar/canal-listar';
import { CanalActualizar } from './components/canal-component/canal-actualizar/canal-actualizar';

import { CanalmonitoreadoComponent } from './components/canalmonitoreado-component/canalmonitoreado-component';
import { CanalmonitoreadoInsertar } from './components/canalmonitoreado-component/canalmonitoreado-insertar/canalmonitoreado-insertar';
import { CanalmonitoreadoListar } from './components/canalmonitoreado-component/canalmonitoreado-listar/canalmonitoreado-listar';
import { CanalmonitoreadoActualizar } from './components/canalmonitoreado-component/canalmonitoreado-actualizar/canalmonitoreado-actualizar';

import { DeteccionpublicitariaComponent } from './components/deteccionpublicitaria-component/deteccionpublicitaria-component';
import { DeteccionpublicitariaInsertar } from './components/deteccionpublicitaria-component/deteccionpublicitaria-insertar/deteccionpublicitaria-insertar';
import { DeteccionpublicitariaListar } from './components/deteccionpublicitaria-component/deteccionpublicitaria-listar/deteccionpublicitaria-listar';
import { DeteccionpublicitariaActualizar } from './components/deteccionpublicitaria-component/deteccionpublicitaria-actualizar/deteccionpublicitaria-actualizar';

import { EmpresaComponent } from './components/empresa-component/empresa-component';
import { EmpresaInsertar } from './components/empresa-component/empresa-insertar/empresa-insertar';
import { EmpresaListar } from './components/empresa-component/empresa-listar/empresa-listar';
import { EmpresaActualizar } from './components/empresa-component/empresa-actualizar/empresa-actualizar';

import { MarcaComponent } from './components/marca-component/marca-component';
import { MarcaInsertar } from './components/marca-component/marca-insertar/marca-insertar';
import { MarcaListar } from './components/marca-component/marca-listar/marca-listar';
import { MarcaActualizar } from './components/marca-component/marca-actualizar/marca-actualizar';

import { MetricasnapshotComponent } from './components/metricasnapshot-component/metricasnapshot-component';
import { MetricasnapshotInsertar } from './components/metricasnapshot-component/metricasnapshot-insertar/metricasnapshot-insertar';
import { MetricasnapshotListar } from './components/metricasnapshot-component/metricasnapshot-listar/metricasnapshot-listar';
import { MetricasnapshotActualizar } from './components/metricasnapshot-component/metricasnapshot-actualizar/metricasnapshot-actualizar';

import { PlanComponent } from './components/plan-component/plan-component';
import { PlanInsertar } from './components/plan-component/plan-insertar/plan-insertar';
import { PlanListar } from './components/plan-component/plan-listar/plan-listar';
import { PlanActualizar } from './components/plan-component/plan-actualizar/plan-actualizar';

import { PlataformaComponent } from './components/plataforma-component/plataforma-component';
import { PlataformaInsertar } from './components/plataforma-component/plataforma-insertar/plataforma-insertar';
import { PlataformaListar } from './components/plataforma-component/plataforma-listar/plataforma-listar';
import { PlataformaActualizar } from './components/plataforma-component/plataforma-actualizar/plataforma-actualizar';

import { RegionComponent } from './components/region-component/region-component';
import { RegionInsertar } from './components/region-component/region-insertar/region-insertar';
import { RegionListar } from './components/region-component/region-listar/region-listar';
import { RegionActualizar } from './components/region-component/region-actualizar/region-actualizar';

import { RoleComponent } from './components/role-component/role-component';
import { RoleInsertar } from './components/role-component/role-insertar/role-insertar';
import { RoleListar } from './components/role-component/role-listar/role-listar';
import { RoleActualizar } from './components/role-component/role-actualizar/role-actualizar';

import { StreamerComponent } from './components/streamer-component/streamer-component';
import { StreamerInsertar } from './components/streamer-component/streamer-insertar/streamer-insertar';
import { StreamerListar } from './components/streamer-component/streamer-listar/streamer-listar';
import { StreamerActualizar } from './components/streamer-component/streamer-actualizar/streamer-actualizar';

import { TransmisionComponent } from './components/transmision-component/transmision-component';
import { TransmisionInsertar } from './components/transmision-component/transmision-insertar/transmision-insertar';
import { TransmisionListar } from './components/transmision-component/transmision-listar/transmision-listar';
import { TransmisionActualizar } from './components/transmision-component/transmision-actualizar/transmision-actualizar';

import { UsersComponent } from './components/users-component/users-component';
import { UsersInsertar } from './components/users-component/users-insertar/users-insertar';
import { UsersListar } from './components/users-component/users-listar/users-listar';
import { UsersActualizar } from './components/users-component/users-actualizar/users-actualizar';
import { HomeComponent } from './components/home-component/home-component';
import { Report01 } from './components/report01/report01';
import { Report02 } from './components/report02/report02';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'homes', pathMatch: 'full' },
    { path: 'homes', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'reporte01', component: Report01 },
    { path: 'reporte02', component: Report02 },

    {
        path: 'canales', component: CanalComponent,
        children: [
            { path: 'nuevo', component: CanalInsertar },
            { path: 'lista', component: CanalListar },
            { path: 'editar/:id', component: CanalActualizar },
        ]
    },
    {
        path: 'canales-monitoreados', component: CanalmonitoreadoComponent,
        children: [
            { path: 'nuevo', component: CanalmonitoreadoInsertar },
            { path: 'lista', component: CanalmonitoreadoListar },
            { path: 'editar/:id', component: CanalmonitoreadoActualizar },
        ]
    },
    {
        path: 'detecciones-publicitarias', component: DeteccionpublicitariaComponent,
        children: [
            { path: 'nuevo', component: DeteccionpublicitariaInsertar },
            { path: 'lista', component: DeteccionpublicitariaListar },
            { path: 'editar/:id', component: DeteccionpublicitariaActualizar },
        ]
    },
    {
        path: 'empresas', component: EmpresaComponent,
        children: [
            { path: 'nuevo', component: EmpresaInsertar },
            { path: 'lista', component: EmpresaListar },
            { path: 'editar/:id', component: EmpresaActualizar },
        ]
    },
    {
        path: 'marcas', component: MarcaComponent,
        children: [
            { path: 'nuevo', component: MarcaInsertar },
            { path: 'lista', component: MarcaListar },
            { path: 'editar/:id', component: MarcaActualizar },
        ]
    },
    {
        path: 'metricas', component: MetricasnapshotComponent,
        children: [
            { path: 'nuevo', component: MetricasnapshotInsertar },
            { path: 'lista', component: MetricasnapshotListar },
            { path: 'editar/:id', component: MetricasnapshotActualizar },
        ]
    },
    {
        path: 'planes', component: PlanComponent,
        children: [
            { path: 'nuevo', component: PlanInsertar },
            { path: 'lista', component: PlanListar },
            { path: 'editar/:id', component: PlanActualizar },
        ]
    },
    {
        path: 'plataformas', component: PlataformaComponent,
        children: [
            { path: 'nuevo', component: PlataformaInsertar },
            { path: 'lista', component: PlataformaListar },
            { path: 'editar/:id', component: PlataformaActualizar },
        ]
    },
    {
        path: 'regiones', component: RegionComponent,
        children: [
            { path: 'nuevo', component: RegionInsertar },
            { path: 'lista', component: RegionListar },
            { path: 'editar/:id', component: RegionActualizar },
        ]
    },
    {
        path: 'roles', component: RoleComponent,
        children: [
            { path: 'nuevo', component: RoleInsertar },
            { path: 'lista', component: RoleListar },
            { path: 'editar/:id', component: RoleActualizar },
        ]
    },
    {
        path: 'streamers', component: StreamerComponent,
        children: [
            { path: 'nuevo', component: StreamerInsertar },
            { path: 'lista', component: StreamerListar },
            { path: 'editar/:id', component: StreamerActualizar },
        ]
    },
    {
        path: 'transmisiones', component: TransmisionComponent,
        children: [
            { path: 'nuevo', component: TransmisionInsertar },
            { path: 'lista', component: TransmisionListar },
            { path: 'editar/:id', component: TransmisionActualizar },
        ]
    },
    {
        path: 'usuarios', component: UsersComponent,
        children: [
            { path: 'nuevo', component: UsersInsertar },
            { path: 'lista', component: UsersListar },
            { path: 'editar/:id', component: UsersActualizar },
        ]
    },
];
