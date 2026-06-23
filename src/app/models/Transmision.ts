import { Canal } from './Canal';

export class Transmision {
    idTransmision: number = 0;
    tituloStream: string = '';
    fechaInicio: string = '';
    fechaFin: string = '';
    enVivo: boolean = false;
    canal: Canal = new Canal();
}
