export interface User{
    uid: string,
    email: string,
    password?:string,
    name: string,
    role: 'client '| 'employee'
}