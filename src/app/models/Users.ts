import { Empresa } from './Empresa';

export class Users {
    id: number = 0;
    username: string = '';
    password: string = '';
    enabled: boolean = true;
    empresa: Empresa = new Empresa();
}
