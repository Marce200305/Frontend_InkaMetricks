import { Plataforma } from "./Plataforma";
import { Streamer } from "./Streamer";

export class Canal{
    idCanal:number=0;
    urlCanal:string='';
    seguidoresActuales:number=0;
    plataforma:Plataforma = new Plataforma();
    streamer:Streamer = new Streamer();
}