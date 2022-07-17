import { INewOrder } from './newOrder.interface';

export interface IOrder {
  uid?: string;
  userName?: string;
  order?: INewOrder[];
}
