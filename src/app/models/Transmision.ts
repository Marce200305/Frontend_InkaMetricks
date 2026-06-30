import { Canal } from './Canal';

export class Transmision{
    idTransmision: number = 0;
    tituloStream:string = '';
    fechaInicio:Date = new Date();
    fechaFin:Date = new Date();
    enVivo:boolean = false;
    canal:Canal= new Canal();
}