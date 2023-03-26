import { Document } from "mongoose";

export interface Usuario extends Document{
    readonly nombre: string;
    readonly apellido: string;
    readonly usuario: string;
    readonly correo: string;
    readonly password: string;
    readonly plan: number;
    readonly createdAt: Date;
}