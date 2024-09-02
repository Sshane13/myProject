// src/app/models/product.model.ts
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: {
      rate: number;
      count: number;
    };
    image: string;
  }
  export type SortableAttributes = 'price' | 'rating.rate';