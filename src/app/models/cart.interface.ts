export interface ICart {
  products?: {
    id?: string;
    quantity?: number;
    image?: string;
    name?: string;
    price?: number;
  }[];
  uid?: string;
}
