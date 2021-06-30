export interface Aeronave {
    id?: string;
    nombre: string;
    imagen: string;
    precio: number;
    disponible: boolean;
    descripcion?: string;
    capacidadTripulantes: number;
}