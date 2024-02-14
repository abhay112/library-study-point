/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllAttendanceResponse, MessageResponse, UpdateAttendanceRequest,GetAttendanceRequest, CreateAttendanceRequest } from "../../types/api-types";

export const attendanceAPI = createApi({
    reducerPath: "attendanceAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/attendance/`,
    }),
    tagTypes: ["attendance"],
    endpoints: (builder) => ({
        getAttendance: builder.query<AllAttendanceResponse, string>({
            query: (adminId) => ({
                url: `getAllStudentTodayAttendace?id=${adminId}`,
                method: "GET",
            }),
        }),
        getSingleStudentAllAttendace: builder.query<MessageResponse, GetAttendanceRequest>({
            query: ({studentId,adminId}) => ({
                url: `${studentId}?id=${adminId}`,
                method: "GET",
            }),
        }),
        createNewStudentAttendance:builder.mutation<MessageResponse,CreateAttendanceRequest>({
            query: ({ studentId,formData }) => ({
                url: `/${studentId}`,
                method: "POST",
                body:formData,
            }),
            invalidatesTags: ["attendance"],
        }),
        updateAttendance: builder.mutation<MessageResponse, UpdateAttendanceRequest>({
            query: ({ studentId, adminId }) => ({
                url: `attendanceApprove/${studentId}?id=${adminId}`,
                method: "PUT",
            }),
            invalidatesTags: ["attendance"],
        }),
    })

})


export const { useGetAttendanceQuery, useCreateNewStudentAttendanceMutation, useUpdateAttendanceMutation,useGetSingleStudentAllAttendaceQuery } = attendanceAPI;