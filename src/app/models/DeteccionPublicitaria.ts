import { Transmision } from './Transmision';
import { Marca } from './Marca';

export class DeteccionPublicitaria {
    idDeteccionPublicitaria: number = 0;
    tipo: string = '';
    minutoAparicion: string = '';
    tiempoAparicionSeg: number = 0;
    transmision: Transmision = new Transmision();
    marca: Marca = new Marca();
}
