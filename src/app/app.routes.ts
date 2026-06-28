import { Routes } from '@angular/router';

import { BrandComponent } from './components/brand-component/brand-component';
import { BrandCreate } from './components/brand-component/brand-create/brand-create';
import { BrandList } from './components/brand-component/brand-list/brand-list';
import { BrandEdit } from './components/brand-component/brand-edit/brand-edit';

import { PlatformComponent } from './components/platform-component/platform-component';
import { PlatformCreate } from './components/platform-component/platform-create/platform-create';
import { PlatformList } from './components/platform-component/platform-list/platform-list';
import { PlatformEdit } from './components/platform-component/platform-edit/platform-edit';

import { CompanyComponent } from './components/company-component/company-component';
import { CompanyCreate } from './components/company-component/company-create/company-create';
import { CompanyList } from './components/company-component/company-list/company-list';
import { CompanyEdit } from './components/company-component/company-edit/company-edit';

import { ChannelComponent } from './components/channel-component/channel-component';
import { ChannelCreate } from './components/channel-component/channel-create/channel-create';
import { ChannelList } from './components/channel-component/channel-list/channel-list';
import { ChannelEdit } from './components/channel-component/channel-edit/channel-edit';

import { BroadcastComponent } from './components/broadcast-component/broadcast-component';
import { BroadcastCreate } from './components/broadcast-component/broadcast-create/broadcast-create';
import { BroadcastList } from './components/broadcast-component/broadcast-list/broadcast-list';
import { BroadcastEdit } from './components/broadcast-component/broadcast-edit/broadcast-edit';

import { MonitoredChannelComponent } from './components/monitored-channel-component/monitored-channel-component';
import { MonitoredChannelCreate } from './components/monitored-channel-component/monitored-channel-create/monitored-channel-create';
import { MonitoredChannelList } from './components/monitored-channel-component/monitored-channel-list/monitored-channel-list';
import { MonitoredChannelEdit } from './components/monitored-channel-component/monitored-channel-edit/monitored-channel-edit';

import { MetricSnapshotComponent } from './components/metric-snapshot-component/metric-snapshot-component';
import { MetricSnapshotCreate } from './components/metric-snapshot-component/metric-snapshot-create/metric-snapshot-create';
import { MetricSnapshotList } from './components/metric-snapshot-component/metric-snapshot-list/metric-snapshot-list';
import { MetricSnapshotEdit } from './components/metric-snapshot-component/metric-snapshot-edit/metric-snapshot-edit';

import { AdDetectionComponent } from './components/ad-detection-component/ad-detection-component';
import { AdDetectionCreate } from './components/ad-detection-component/ad-detection-create/ad-detection-create';
import { AdDetectionList } from './components/ad-detection-component/ad-detection-list/ad-detection-list';
import { AdDetectionEdit } from './components/ad-detection-component/ad-detection-edit/ad-detection-edit';

import { PlanComponent } from './components/plan-component/plan-component';
import { PlanInsertar } from './components/plan-component/plan-insertar/plan-insertar';
import { PlanListar } from './components/plan-component/plan-listar/plan-listar';
import { PlanActualizar } from './components/plan-component/plan-actualizar/plan-actualizar';

import { RegionComponent } from './components/region-component/region-component';
import { RegionInsertar } from './components/region-component/region-insertar/region-insertar';
import { RegionListar } from './components/region-component/region-listar/region-listar';
import { RegionActualizar } from './components/region-component/region-actualizar/region-actualizar';

import { StreamerComponent } from './components/streamer-component/streamer-component';
import { StreamerInsertar } from './components/streamer-component/streamer-insertar/streamer-insertar';
import { StreamerListar } from './components/streamer-component/streamer-listar/streamer-listar';
import { StreamerActualizar } from './components/streamer-component/streamer-actualizar/streamer-actualizar';

import { RoleComponent } from './components/role-component/role-component';
import { RoleInsertar } from './components/role-component/role-insertar/role-insertar';
import { RoleListar } from './components/role-component/role-listar/role-listar';
import { RoleActualizar } from './components/role-component/role-actualizar/role-actualizar';

import { UserComponent } from './components/user-component/user-component';
import { UserCreate } from './components/user-component/user-create/user-create';
import { UserList } from './components/user-component/user-list/user-list';
import { UserEdit } from './components/user-component/user-edit/user-edit';

import { HomeComponent } from './components/home-component/home-component';
import { TopBroadcastsByMetric } from './components/top-broadcasts-by-metric-component/top-broadcasts-by-metric-component';
import { MetricsByRegion } from './components/metrics-by-region-component/metrics-by-region-component';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'homes', pathMatch: 'full' },
    { path: 'homes', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'top-broadcasts-by-metric', component: TopBroadcastsByMetric },
    { path: 'metrics-by-region', component: MetricsByRegion },

    {
        path: 'brands', component: BrandComponent,
        children: [
            { path: 'create', component: BrandCreate },
            { path: 'list', component: BrandList },
            { path: 'edit/:id', component: BrandEdit },
        ]
    },
    {
        path: 'platforms', component: PlatformComponent,
        children: [
            { path: 'create', component: PlatformCreate },
            { path: 'list', component: PlatformList },
            { path: 'edit/:id', component: PlatformEdit },
        ]
    },
    {
        path: 'companies', component: CompanyComponent,
        children: [
            { path: 'create', component: CompanyCreate },
            { path: 'list', component: CompanyList },
            { path: 'edit/:id', component: CompanyEdit },
        ]
    },
    {
        path: 'channels', component: ChannelComponent,
        children: [
            { path: 'create', component: ChannelCreate },
            { path: 'list', component: ChannelList },
            { path: 'edit/:id', component: ChannelEdit },
        ]
    },
    {
        path: 'broadcasts', component: BroadcastComponent,
        children: [
            { path: 'create', component: BroadcastCreate },
            { path: 'list', component: BroadcastList },
            { path: 'edit/:id', component: BroadcastEdit },
        ]
    },
    {
        path: 'monitored-channels', component: MonitoredChannelComponent,
        children: [
            { path: 'create', component: MonitoredChannelCreate },
            { path: 'list', component: MonitoredChannelList },
            { path: 'edit/:id', component: MonitoredChannelEdit },
        ]
    },
    {
        path: 'metrics', component: MetricSnapshotComponent,
        children: [
            { path: 'create', component: MetricSnapshotCreate },
            { path: 'list', component: MetricSnapshotList },
            { path: 'edit/:id', component: MetricSnapshotEdit },
        ]
    },
    {
        path: 'ad-detections', component: AdDetectionComponent,
        children: [
            { path: 'create', component: AdDetectionCreate },
            { path: 'list', component: AdDetectionList },
            { path: 'edit/:id', component: AdDetectionEdit },
        ]
    },
    {
        path: 'plans', component: PlanComponent,
        children: [
            { path: 'create', component: PlanInsertar },
            { path: 'list', component: PlanListar },
            { path: 'edit/:id', component: PlanActualizar },
        ]
    },
    {
        path: 'regions', component: RegionComponent,
        children: [
            { path: 'create', component: RegionInsertar },
            { path: 'list', component: RegionListar },
            { path: 'edit/:id', component: RegionActualizar },
        ]
    },
    {
        path: 'streamers', component: StreamerComponent,
        children: [
            { path: 'create', component: StreamerInsertar },
            { path: 'list', component: StreamerListar },
            { path: 'edit/:id', component: StreamerActualizar },
        ]
    },
    {
        path: 'roles', component: RoleComponent,
        children: [
            { path: 'create', component: RoleInsertar },
            { path: 'list', component: RoleListar },
            { path: 'edit/:id', component: RoleActualizar },
        ]
    },
    {
        path: 'users', component: UserComponent,
        children: [
            { path: 'create', component: UserCreate },
            { path: 'list', component: UserList },
            { path: 'edit/:id', component: UserEdit },
        ]
    },
];
