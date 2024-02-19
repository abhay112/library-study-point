import { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import { useGetAttendanceQuery, useUpdateAttendanceMutation } from "../../../redux/api/attendanceAPI";
import TableHOC from "../../../components/admin/TableHOC";
import { Attendace } from "../../../types/types";
import { CustomError } from "../../../types/api-types";
import { useGetFilledSeatLayoutQuery, useGetSeatLayoutQuery } from "../../../redux/api/seatAPI";
import { FaEdit } from "react-icons/fa";
import RefreshBtn from "../../../components/refreshBtn";
import { Skeleton } from "../../../components/loader";

interface DataType {
  photo: ReactElement;
  name: string;
  seat: number;
  status: ReactElement;
  action: ReactElement;
}

const img2 = "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png";


const attendanceColumns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
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

const SeatDetails = () => {
  const { admin } = useSelector((state: RootState) => state.adminReducer);
  const adminId = admin?._id||"";
  const { isError, error, data: attendanceData, refetch: attendaceRefech,isLoading:isLoadingAttendace, } = useGetAttendanceQuery(adminId, { refetchOnMountOrArgChange: true });
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [attendaceRows, setAttendaceRows] = useState<DataType[]>([]);
  const [rows, setRows] = useState<number | "">("");
  const [columns, setColumns] = useState<number | "">("");
  const [matrix, setMatrix] = useState<number[][]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { data, refetch ,isLoading:isLoadingSeatLayout} = useGetSeatLayoutQuery(adminId, { refetchOnMountOrArgChange: true });
  const {data:fetchSeat,refetch: filledSeatRefetch  } = useGetFilledSeatLayoutQuery(adminId, { refetchOnMountOrArgChange: true });
  console.log(fetchSeat,data);
  console.log(attendanceData)
  useEffect(() => {
    if (attendanceData && attendanceData.data) {
      setAttendaceRows(
        attendanceData?.data.map((val: Attendace) => ({
          photo: <img src={img2} alt="Shoes" />,
          name: val.studentName.split(' ')[0],
          seat: val.latestAttendance?.seatNumber ? val.latestAttendance?.seatNumber : 0, // Ensure seat is always a number
          status: val.latestAttendance?.isPresent === "Present" ? <span className="green">Present</span> : val.latestAttendance?.isPresent === "Pending" ? <span className="purple">Pending</span> : <span className="red">Absent</span>,
          action: val.latestAttendance?.isPresent === "Pending" ?
            <Link to={`/admin/seats`}
              onClick={() => { updateHandler(val.adminId, val.studentId) }} >Accept
            </Link>
            : <Link
              to={{
                pathname: `/admin/attendance/${val.studentId}`,
              }}
            >
              Manage
            </Link>
        }))
      );
    }
  }, [attendanceData]);

  useEffect(() => {
    if (rows !== "" && columns !== "") {
      const newMatrix = Array.from({ length: Number(rows) }, () =>
        Array.from({ length: Number(columns) }, () => 0)
      );
      setMatrix(newMatrix);
      if (boardRef.current) {
        boardRef.current.style.setProperty("--grid-rows", String(rows));
        boardRef.current.style.setProperty("--grid-columns", String(columns));
      }
    }
    console.log(data);
    if (data) {
      setMatrix(data?.data?.matrix);
      setSubmitted(true);
      setRows(data?.data?.rows);
      setColumns(data?.data?.columns)
    }
    seatingArrangement();
  }, [rows, columns, data]);
  const seatingArrangement = () => {
    if (!matrix.length) return null;
    const html: JSX.Element[] = [];
    const filledSeats = fetchSeat?.data?.filledSeats || [];
    for (let i = 0; i < Number(rows); i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < Number(columns); j++) {
        const seat = filledSeats.find((seat: { idx1: number; idx2: number; }) => seat.idx1 === i && seat.idx2 === j);
        const className = seat?.isPresent === 'Present' ? 'filled' : seat?.isPresent === 'Pending' ? 'pending' : '';
        row.push(
          <div key={j} className="square">
            {matrix[i][j] !== 0 && matrix[i][j] !== 999 ? (
              <p
                className={`seat ${className}`}
                onClick={() => handleGetSeatStatus(i, j)}
              >{matrix[i][j]}</p>
            ) : matrix[i][j] == 999 ? <p className="gate"></p> : <p className="empty"></p>}
          </div>
        );
      }
      html.push(
        <div key={i} className="grid-row">
          {row}
        </div>
      );
    }
    return html;
  };

  const handleGetSeatStatus = (row: number, col: number) => {
    console.log(`Seat at row ${row}, column ${col} clicked`);
  };
  const handleRefresh = async () => {
    try {
      await refetch();
      await filledSeatRefetch();
      await attendaceRefech();
      console.log("Seating arrangement refreshed successfully");
    } catch (error) {
      console.error("Error refreshing seating arrangement:", error);
    }
  }
  const Table = TableHOC<DataType>(
    attendanceColumns,
    attendaceRows,
    "dashboard-attendace-box",
    "Attendance",
    attendaceRows.length > 6
  )();
  const updateHandler = async (adminId: string, studentId: string) => {
    const res = await updateAttendance({
      adminId: adminId,
      studentId: studentId,
    });
    console.log(res)
    attendaceRefech();
    handleRefresh();
  };
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const handleBtnRefresh = () => {
  //   setIsRefreshing(true);
  //   setTimeout(() => {
  //     setIsRefreshing(false);
  //   }, 1000);
  // };
  const handleBtnRefresh = async () => {
    try {
      await refetch();
      await filledSeatRefetch();
      await attendaceRefech();
      console.log("Seating arrangement refreshed successfully");
    } catch (error) {
      console.error("Error refreshing seating arrangement:", error);
    }
  }
  return (
    <div className="seat-arrangement-page">
      <div className={`refresh`} onClick={handleBtnRefresh}>
        <RefreshBtn />
    </div>
    
      {!data&&
       <Link to="/admin/seats/new" >
          <FaEdit onClick={() => setSubmitted(false)} /> Create Seat Arrangement
        </Link>}
      {!isLoadingSeatLayout ?
        <main className="seat-continer">
          <div className="seat-page">
            <div className="seating-arrangement">
              {submitted && (
                <div>
                  <div>
                    <h2 className="heading heading-padding">Seating Arrangement</h2>
                  
                  </div>
                  {seatingArrangement()}
                </div>
              )}
            </div>
          </div>
          {isLoadingAttendace?<Skeleton length={10}/>:Table}
        </main>
        :<Skeleton length={10}/>}
      {
        submitted && <Link to="/admin/seats/new" className="create-product-btn">
          <FaEdit onClick={() => setSubmitted(false)} />
        </Link>
      }
      <div className="footer-des">
        <p>color</p>
      </div>
    </div>
  );
};

export default SeatDetails;
