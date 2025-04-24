
export interface ProductType {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  features?: string[];
  specifications?: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItemType extends ProductType {
  quantity: number;
}
