/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllStudentsResponse,
  StudentResponse,
  MessageResponse,
  DeleteStudentRequest,
  UpdateStudentRequest,
  NewStudentRequest
} from "../../types/api-types";

export const studentAPI = createApi({
  reducerPath: "studentAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/student/`,
  }),
  tagTypes: ["student"],
  endpoints: (builder) => ({
    allStudents: builder.query<AllStudentsResponse, string>({
      query: (id) => `latest?id=${id}`,
      providesTags: ["student"],
    }),
    allEnrolledStudents: builder.query<AllStudentsResponse, string>({
      query: (id) => `enrolled?id=${id}`,
      providesTags: ["student"],
    }),
    studentDetails: builder.query<StudentResponse, string>({
      query: (id) => id,
      providesTags: ["student"],
    }), 
    newStudent: builder.mutation<MessageResponse, NewStudentRequest>({
      query: ({ formData, id }) => ({
        url: `new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["student"], 
    }),
    deleteStudent: builder.mutation<MessageResponse, DeleteStudentRequest>({
      query: ({ userId, studentId }) => ({
        url: `${studentId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
    updateStudent: builder.mutation<MessageResponse, UpdateStudentRequest>({
      query: ({ formData, userId, studentId }) => ({
        url: `${studentId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["student"],
    }),

  }),
});

export const {
  useAllStudentsQuery,
  useAllEnrolledStudentsQuery,
  useStudentDetailsQuery,
  useNewStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentAPI;

