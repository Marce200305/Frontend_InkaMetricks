import { Users } from './Users';

export class Role{
    id: number = 0;
    rol: string = '';
    users: Users = new Users();
}