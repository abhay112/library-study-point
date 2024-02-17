import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  AdminResponse,
  MessageResponse,
} from "../../types/api-types";
import { Admin} from "../../types/types";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin/`,
  }),
  tagTypes: ["admins"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation<MessageResponse,Admin>({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
      }),
    }),
    adminSignUp: builder.mutation<MessageResponse, Admin>({
      query: (admin) => ({
        url: "new",
        method: "POST",
        body: admin,
      }),
      invalidatesTags: ["admins"],
    }),

  }),
});

export const getAdmin = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data }: { data: AdminResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/admin/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useAdminSignUpMutation,useAdminLoginMutation } =  adminApi;
