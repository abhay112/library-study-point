// attendanceSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attendace } from '../../types/types';

interface AttendanceState {
  attendanceList: Attendace[];
}

const initialState: AttendanceState = {
  attendanceList: [],
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceList: (state, action: PayloadAction<Attendace[]>) => {
      state.attendanceList = action.payload;
    },
    updateAttendanceStatus: (state, action: PayloadAction<{ studentId: string; isPresent: 'Present' }>) => {
      state.attendanceList = state.attendanceList.map((attendance) =>
        attendance.studentId === action.payload.studentId
          ? { ...attendance, latestAttendance: { ...attendance.latestAttendance, isPresent: action.payload.isPresent } }
          : attendance
      );
    },
  },
});

export const { setAttendanceList, updateAttendanceStatus } = attendanceSlice.actions;

export default attendanceSlice.reducer;
