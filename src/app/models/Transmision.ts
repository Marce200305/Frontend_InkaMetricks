import { Canal } from './Canal';

export class Transmision {
    IdTransmision: number = 0;
    TituloStream: string = '';
    FechaInicio: string = '';
    FechaFin: string = '';
    EnVivo: boolean = false;
    canal: Canal = new Canal();
}
