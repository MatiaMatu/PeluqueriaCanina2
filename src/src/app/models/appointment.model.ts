import { Product } from './product.model'; // Asegúrate de que la ruta sea correcta

export interface Appointment {
    id: string;
    petName: string;
    ownerName: string;
    date: string;
    trackingCode: string;
    status: string;
    userId: string;    
    time: string;
    selectedProducts: Product[]; // Agrega esta propiedad
    totalCost?: number; // Agrega esta propiedad
    
  }
  
  