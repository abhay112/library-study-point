import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
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

const Attendance = () => {
  const { admin } = useSelector((state: RootState) => state.adminReducer);
  const adminId = admin?._id  ??  "";
  const { isLoading, isError, error, data, refetch } = useGetAttendanceQuery(adminId, { refetchOnMountOrArgChange: true });
  console.log(data);
  const [updateAttendance] = useUpdateAttendanceMutation();
  const updateHandler = async (adminId: string, studentId: string) => {
    const res = await updateAttendance({
      adminId: adminId,
      studentId: studentId,
    });
    console.log(res);
    refetch();
  };
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
      if (data.data) {
        setRows(
          (data?.data || []).map((val: Attendace) => ({
            photo: <img src={img2} alt="Shoes" />,
            name: val?.studentName.split(' ')[0] || "",
            day: val?.latestAttendance?.day || "",
            seat: typeof val?.latestAttendance?.seatNumber === "number" ? val.latestAttendance.seatNumber : 0, 
            status: val?.latestAttendance?.isPresent === "Present" ? <span className="green">Present</span> : val?.latestAttendance?.isPresent === "Pending" ? <span className="purple">Pending</span> : <span className="red">Absent</span>,
            action: val?.latestAttendance?.isPresent === "Pending" ?
              <Link to={`/admin/attendance`}
                onClick={() => { updateHandler(val?.adminId, val?.studentId) }} >Accept
              </Link>
              : <Link
                to={{
                  pathname: `/admin/attendance/${val?.studentId}`,
                }}
              >
                Manage
              </Link>
          }))
        )
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
      {/* <main>{Table}</main> */}
    </div>
  );
};

export default Attendance;
