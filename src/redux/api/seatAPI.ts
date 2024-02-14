import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MessageResponse, NewSeatRequest,
} from "../../types/api-types";

export const seatAPI = createApi({
  reducerPath: "seatAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/seats/`,
  }),
  tagTypes: ["seats"],
  endpoints: (builder) => ({
    getSeatLayout: builder.query<MessageResponse, string>({
      query: (id) => `fetchSeatLayout?id=${id}`,
      providesTags: ["seats"],
    }),
    getFilledSeatLayout: builder.query<MessageResponse, string>({
      query: () => `fetchFilledSeats`,
      providesTags: ["seats"],
    }),
    createSeat: builder.mutation<MessageResponse, NewSeatRequest>({
      query: ({formData,adminId}) => ({
        url: `createSeats?id=${adminId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["seats"],
    }),
  }),
});


export const {useGetSeatLayoutQuery, useGetFilledSeatLayoutQuery, useCreateSeatMutation } = seatAPI;
