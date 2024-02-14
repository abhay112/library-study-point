import { ReactElement, useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Column } from "react-table";
import UserSidebar from "../../components/admin/UserSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetAttendanceQuery, useUpdateAttendanceMutation } from "../../redux/api/attendanceAPI";
import { Attendace } from "../../types/types";
import { Skeleton } from "../../components/loader";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";

interface DataType {
  photo: ReactElement;
  name: string;
  day: string;
  seat: number;
  status: ReactElement;
  action: ReactElement;
}

const img2 = "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png";


const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Day",
    accessor: "day",
  },
  {
    Header: "Seat",
    accessor: "seat",
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

const UserAttendance = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data, refetch } = useGetAttendanceQuery(user?._id, { refetchOnMountOrArgChange: true });
  console.log(data);
  const [updateAttendance] = useUpdateAttendanceMutation();
  const updateHandler = async (adminId: string, studentId: string) => {
    const res = await updateAttendance({
      adminId: adminId,
      studentId: studentId,
    });
    console.log(res)
    refetch();
  };
  const attendance = data?.data;
  const [rows, setRows] = useState<DataType[]>([]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Attendance",
    rows.length > 6
  )();

  useEffect(() => {
    if (data) {
      setRows(
        attendance?.map((val: Attendace) => ({
          photo: <img src={img2} alt="Shoes" />,
          name: val?.studentName,
          day: val?.latestAttendance?.day,
          seat: val?.latestAttendance?.seatNumber ? val?.latestAttendance?.seatNumber : <span className="grey">----</span>,
          status: val?.latestAttendance?.isPresent === "Present" ? <span className="green">Present</span> : val?.latestAttendance?.isPresent === "Pending" ? <span className="purple">Pending</span> : <span className="red">Absent</span>,
          action: val?.latestAttendance?.isPresent === "Pending" ?
            <Link to={`/user/attendance`}
              onClick={() => { updateHandler(val?.adminId, val?.studentId) }} >Accept
            </Link>
            : <Link
              to={{
                pathname: `/user/attendance/${val?.studentId}`,
              }}
            >
              Manage
            </Link>
        }))
      )
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
      {/* <main>{Table}</main> */}
    </div>
  );
};

export default UserAttendance;
