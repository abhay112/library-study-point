import { Admin, CartItem, ShippingInfo, User } from "./types";

export interface AdminReducerInitialState {
  admin: Admin | null;
  loading: boolean;
}


export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
