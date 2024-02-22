import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  MessageResponse, NewPdfRequest,  } from "../../types/api-types";

export const pdfAPI = createApi({
    reducerPath: "pdfAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin/`,
    }),
    tagTypes: ["pdf"],
    endpoints: (builder) => ({
        createPdf: builder.mutation<MessageResponse, NewPdfRequest>({
            query: ({formData}) => ({
              url: `recipts`,
              method: "POST",
              body: formData,
            }),
            invalidatesTags: ["pdf"],
          }),
    })

})

export const { useCreatePdfMutation } = pdfAPI;