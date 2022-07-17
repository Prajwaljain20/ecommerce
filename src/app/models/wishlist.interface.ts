export interface IWishlist {
  uid?: string;
  products?: {
    name?: string;
    product_id?: string;
    price?: number;
    image?: string;
  }[];
}
