import { Transmision } from './Transmision';

export class MetricaSnapshot {
    IdMetricaSnapshot: number = 0;
    Nombre: string = '';
    Cantidad: number = 0;
    Transmision: Transmision = new Transmision();
}