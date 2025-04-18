// types.ts
export interface Booking {
    _id: string;
    service: {
      _id: string;
      name: string;
      price: number;
    };
    user: {
      _id: string;
      name: string;
      email: string;
    };
    eventDate: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    totalPrice: number;
    guests: number;
    createdAt: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    image:string
    createdAt: string;
  }
  
  export interface Service {
    id: number; // Changed from _id to id
    name: string;
    type: string;
    price: number;
    capacity?: number;
    image: string;
    description: string;
    features: string[];
}
