import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetSingleStudentAllAttendaceQuery } from "../../../redux/api/attendanceAPI";
import { Skeleton } from "../../../components/loader";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import UserSidebar from "../../../components/admin/UserSidebar";

interface DataType {
  inTiming: ReactElement;
  outTiming: string;
  day: string;
  seat: number | ReactElement;
  status: ReactElement;
  action: ReactElement;
}

const img2 = "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png";

const columns: Column<DataType>[] = [
  {
    Header: "Day",
    accessor: "day",
  },
  {
    Header: "Seat",
    accessor: "seat",
  },
  {
    Header: "In-Timing",
    accessor: "inTiming",
  },
  {
    Header: "Out-Timimg",
    accessor: "outTiming",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const UserAttendanceManagement = () => {
  const location = useLocation();
  const studentId = location.pathname.split('/').pop() || '';
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data, refetch } = useGetSingleStudentAllAttendaceQuery({ adminId: user?._id, studentId: studentId });

  const updateHandler = async (adminId: string, studentId: string) => {
    // Implement your update logic here
    // For example, you can call the update API
    // const res = await updateAttendance({ adminId, studentId });
    // console.log(res);
    refetch();
  };

  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    data?.data?.studentName,
    rows.length > 6
  )();

  useEffect(() => {
    if (data) {
      setRows(
        data.data?.attendance.map((entry) => ({
          photo: <img src={img2} alt="Shoes" />,
          name: data.data?.studentName || "",
          day: entry.day || "",
          seat: entry.seatNumber || <span className="grey">----</span>,
          status: entry.isPresent === "Present" ? (
            <span className="green">Present</span>
          ) : entry.isPresent === "Pending" ? (
            <span className="purple">Pending</span>
          ) : (
            <span className="red">Absent</span>
          ),
          action: entry.isPresent === "Pending" ? (
            <Link
              to={`/user/attendance`}
              onClick={() => {
                updateHandler(data.data?.adminId || "", data.data?.studentId || "");
              }}
            >
              Accept
            </Link>
          ) : (
            <Link
              to={{
                pathname: `/user/attendance/${data.data?.studentId}`,
              }}
            >
              Manage
            </Link>
          ),
        }))
      );
    }
  }, [data]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="admin-container">
      <UserSidebar />
      {isLoading ? <Skeleton length={20} /> : Table}
    </div>
  );
};

export default UserAttendanceManagement;
