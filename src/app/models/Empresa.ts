import { Plan } from './Plan';

export class Empresa {
    IdEmpresa: number = 0;
    NombreComercial: string = '';
    Ruc: string = '';
    Plan: Plan = new Plan();
}
