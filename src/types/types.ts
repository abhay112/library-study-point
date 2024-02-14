export type User = {
  name: string;
  email: string;
  photo: string;
  role: string;
  _id: string;
};

export type Product = {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
};
export type Student = {
  adminId: string;
  name: string;
  email: string;
  mobile: string;
  library: string;
  shift: string;
  feesAmount: number;
  active: boolean;
  attendance: string;
  photo: string;
  _id: string;
};
export type Attendace = {
  studentId: string;
  adminId: string;
  studentName: string;
  latestAttendance: {
    day: string;
    idx1: number | null;
    idx2: number | null;
    isPresent: "Present" | "Not Present" | "Pending";
    seatNumber: number;
  };
  _id: string;
};
export interface AttendanceFormData {
  idx1: number;
  idx2: number;
}
export type Fees = {
  studentId: string;
  adminId: string;
  studentName: string;
  mobile:number;
  fees: {
    date: string;
    day: string;
    month: string;
    year: number;
    amount: number;
    feesStatus:boolean;
    shift:string;
  };
  _id: string;
}

export type Enquiry = {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  shift: string;
  message: string;
  adminId: string;
  _id: string;
};
export type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};
export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};

type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  users: number[];
  products: number[];
  orders: number[];
};
export type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
