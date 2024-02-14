/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  AllFeesResponse,  } from "../../types/api-types";

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
    })

})


export const { useGetFeesQuery } = feesAPI;