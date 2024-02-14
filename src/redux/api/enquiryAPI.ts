/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  MessageResponse,  AllEnquiryResponse, NewEnquiryRequest, DeleteQueryRequest, GetSingleEnquiryRequest, UpdatetEnquiryRequest } from "../../types/api-types";

export const enquiryAPI = createApi({
    reducerPath: "enquiryAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/enquiry/`,
    }),
    tagTypes: ["enquiry"],
    endpoints: (builder) => ({
        getEnquiry: builder.query<AllEnquiryResponse, string>({
            query: (adminId) => ({
                url: `all?id=${adminId}`,
                providesTags: ["enquiry"],
            }),
        }),
        getSingleEnquiry: builder.query<AllEnquiryResponse, GetSingleEnquiryRequest>({
            query: ({adminId,id}) => ({
                url: `${id}?id=${adminId}`,
                providesTags: ["enquiry"],
            }),
        }),
        createEnquiry: builder.mutation<MessageResponse, NewEnquiryRequest>({
            query: ({ formData, id }) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["enquiry"],
        }),
        updateEnquiry: builder.mutation<MessageResponse, UpdatetEnquiryRequest>({
            query: ({ adminId,enquiryId, formData }) => ({
              url: `${enquiryId}?id=${adminId}`,
              method: "PUT",
              body: formData,
            }),
            invalidatesTags: ["enquiry"],
          }),
        deleteEnquiry: builder.mutation<MessageResponse, DeleteQueryRequest>({
            query: ({ adminId, queryId }) => ({
              url: `${queryId}?id=${adminId}`,
              method: "DELETE",
            }),
            invalidatesTags: ["enquiry"],
          }),
    })

})


export const {useGetEnquiryQuery,useGetSingleEnquiryQuery, useCreateEnquiryMutation,useUpdateEnquiryMutation, useDeleteEnquiryMutation } = enquiryAPI;