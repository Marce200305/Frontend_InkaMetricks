import { Transmision } from './Transmision';

export class MetricaSnapshot {
    idMetricaSnapshot: number = 0;
    nombre: string = '';
    cantidad: number = 0;
    transmision: Transmision = new Transmision();
}
