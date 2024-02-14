import {
  Bar,
  CartItem,
  Line,
  Order,
  Pie,
  Student,
  Attendace,
  ShippingInfo,
  Stats,
  User,
  Enquiry,
  Fees,
  AttendanceFormData,
} from "./types";

export type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllStudentsResponse = {
  success: boolean;
  students: Student[];
};
export type AllAttendanceResponse = {
  success: boolean;
  attendance: Attendace[];
};
export type AllFeesResponse = {
  success: boolean;
  attendance: Fees[];
};
export type AllEnquiryResponse = {
  success: boolean;
  enquiry: Enquiry[];
};
export type GetSingleEnquiryRequest = {
  adminId: string;
  id: string;
};
export type UpdatetEnquiryRequest = {
  adminId: string;
  enquiryId: string;
  formData: Enquiry[];
};

export type UpdateAttendanceRequest = {
  adminId: string;
  studentId: string;
};

export type CreateAttendanceRequest = {
  studentId:string;
  formData: AttendanceFormData;
}
export type GetAttendanceRequest = {
  adminId: string;
  studentId: string;
};

export type NewEnquiryRequest = {
  id: string;
  formData: object;
};
export type NewSeatRequest = {
  adminId:string;
  formData:object;
}
export type DeleteQueryRequest = {
  adminId: string;
  queryId: string;
};

export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type SearchStudentsResponse = AllStudentsResponse & {
  totalPage: number;
};
export type SearchStudentsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
export type StudentResponse = {
  success: boolean;
  student: Student;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};
export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};

export type NewStudentRequest = {
  id: string;
  formData: FormData;
};
export type UpdateStudentRequest = {
  userId: string;
  studentId: string;
  formData: FormData;
};
export type DeleteStudentRequest = {
  userId: string;
  studentId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};
