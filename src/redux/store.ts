import { configureStore } from "@reduxjs/toolkit";
import { studentAPI } from "./api/studentAPI";
import { userAPI } from "./api/userAPI";
import { attendanceAPI } from "./api/attendanceAPI";
import { userReducer } from "./reducer/userReducer";
import { enquiryAPI } from "./api/enquiryAPI";
import { feesAPI } from "./api/feesAPI";
import { seatAPI } from "./api/seatAPI";
// import { cartReducer } from "./reducer/cartReducer";
// import { orderApi } from "./api/orderAPI";
// import { dashboardApi } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [studentAPI.reducerPath]: studentAPI.reducer,
    [attendanceAPI.reducerPath]:attendanceAPI.reducer,
    [enquiryAPI.reducerPath]: enquiryAPI.reducer,
    [feesAPI.reducerPath]: feesAPI.reducer,
    [seatAPI.reducerPath]: seatAPI.reducer,
    // [orderApi.reducerPath]: orderApi.reducer,
    // [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userReducer.name]: userReducer.reducer,
    // [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userAPI.middleware,
    studentAPI.middleware,
    attendanceAPI.middleware,
    enquiryAPI.middleware,
    feesAPI.middleware,
    seatAPI.middleware,
    // orderApi.middleware,
    // dashboardApi.middleware,
  ],
  
});

export type RootState = ReturnType<typeof store.getState>;
