/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import TableHOC from "../../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetSingleStudentAllAttendaceQuery } from "../../../redux/api/attendanceAPI";
import { Skeleton } from "../../../components/loader";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { useGetUserFeesQuery } from "../../../redux/api/feesAPI";

interface DataType {
  inTiming?: ReactElement;
  outTiming?: string;
  day: string;
  seat: number | ReactElement;
  status: ReactElement;
  action: ReactElement;
}
interface AttendanceEntry {
  day: string | null;
  idx1: number | null;
  idx2: number | null;
  isPresent: "Present" | "Not Present" | "Pending" | null;
  seatNumber: number | null;
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

const FeesManagement = () => {
  const location = useLocation();
  const studentId = location.pathname.split('/').pop() || '';
  const { admin } = useSelector((state: RootState) => state.adminReducer);
  const adminId = admin?._id ||"";
  const { data:feesData } = useGetUserFeesQuery({_id:studentId,adminId:adminId});
  console.log(feesData);
  const { isLoading, isError, error, data, refetch } = useGetSingleStudentAllAttendaceQuery({ adminId:adminId, studentId: studentId });
  const updateHandler = async (adminId: string, studentId: string) => {
    console.log(adminId,studentId);
    refetch();
  };
  const [rows, setRows] = useState<DataType[]>([]);
  console.log(data);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    data?.data?.studentName || "",
    rows.length > 6
  )();

  useEffect(() => {
    if (data) {
      if (Array.isArray(data.data.attendance)) {
        const attendance: AttendanceEntry[] = data.data.attendance || [];
        console.log(data.data.attendance)
        console.log(attendance)
        setRows(
          attendance.map((entry) => ({
            photo: <img src={img2} alt="Shoes" />,
            name: data.data.studentName || "",
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
                to={`/admin/attendance`}
                onClick={() => {
                  updateHandler(data?.data?.adminId || "", data?.data?.studentId || "");
                }}
              >
                Accept
              </Link>
            ) : (
              <Link
                to={{
                  pathname: `/admin/attendance/${data.data.studentId}`,
                }}
              >
                Manage
              </Link>
            ),
          }))
        );
      }
     
    }
  }, [data]);
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? <Skeleton length={20} /> : Table}
    </div>
  );
};

export default FeesManagement;
