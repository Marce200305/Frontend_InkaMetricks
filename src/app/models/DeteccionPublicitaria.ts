import { Transmision } from './Transmision';
import { Marca } from './Marca';

export class DeteccionPublicitaria {
    IdDeteccionPublicitaria: number = 0;
    Tipo: string = '';
    MinutoAparicion: string = '';
    TiempoAparicionSeg: number = 0;
    Transmision: Transmision = new Transmision();
    Marca: Marca = new Marca();
}
