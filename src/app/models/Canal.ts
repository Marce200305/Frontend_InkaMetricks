import { Plataforma } from './Plataforma';
import { Streamer } from './Streamer';

export class Canal {
    IdCanal: number = 0;
    UrlCanal: string = '';
    SeguidoresActuales: number = 0;
    Plataforma: Plataforma = new Plataforma();
    Streamer: Streamer = new Streamer();
}
