/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  AllFeesResponse, MessageResponse, UpdateFeesRequest, UserFeesRequest, UserFeesResponse,  } from "../../types/api-types";

export const feesAPI = createApi({
    reducerPath: "feesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/fees/`,
    }),
    tagTypes: ["fees"],
    endpoints: (builder) => ({
        getFees: builder.query<AllFeesResponse, string>({
            query: (adminId) => ({
                url: `getAllStudentLatestFees?id=${adminId}`,
                method: "GET",
            }),
        }),
        getUserFees: builder.query<UserFeesResponse, UserFeesRequest>({
            query: ({_id,adminId}) => ({
                url: `${_id}?id=${adminId}`,
                method: "GET",
            }),
        }),
        submitDueFees:builder.mutation<MessageResponse,UpdateFeesRequest>({
            query: ({ feesId }) => ({
                url: `/${feesId}`,
                method: "PUT",
            }),
            invalidatesTags: ["fees"],
        })
    })

})


export const { useGetFeesQuery,useGetUserFeesQuery,useSubmitDueFeesMutation } = feesAPI;