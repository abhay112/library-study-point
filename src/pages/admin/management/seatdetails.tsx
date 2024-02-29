import { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import { useGetTodayAttendanceQuery, useUpdateAttendanceMutation } from "../../../redux/api/attendanceAPI";
import TableHOC from "../../../components/admin/TableHOC";
import { Attendace } from "../../../types/types";
import { CustomError } from "../../../types/api-types";
import { useGetFilledSeatLayoutQuery, useGetSeatLayoutQuery } from "../../../redux/api/seatAPI";
import { FaEdit } from "react-icons/fa";
import RefreshBtn from "../../../components/refreshBtn";
import { Skeleton } from "../../../components/loader";
import PopUpModal from "../modals/popup";
import useModal from "../../../hooks/useModal";
import SeatsManagement from "./seatmanagement";
import gate from '../../../assets/gate.png'

interface DataType {
  photo: ReactElement;
  name: string;
  seat: number;
  checkin:string;
  checkout:string;
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
    Header: "CheckIn",
    accessor: "checkin",
  },
  {
    Header: "CheckOut",
    accessor: "checkout",
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
  const adminId = admin?._id || "";
  const { isOpen, toggle } = useModal();
  const { isError, error, data: attendanceData, refetch: attendaceRefech, isLoading: isLoadingAttendace, } = useGetTodayAttendanceQuery(adminId, { refetchOnMountOrArgChange: true });
  const [updateAttendance] = useUpdateAttendanceMutation();
  const [attendaceRows, setAttendaceRows] = useState<DataType[]>([]);
  const [rows, setRows] = useState<number | "">("");
  const [columns, setColumns] = useState<number | "">("");
  const [matrix, setMatrix] = useState<number[][]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { data, refetch, isLoading: isLoadingSeatLayout } = useGetSeatLayoutQuery(adminId, { refetchOnMountOrArgChange: true });
  const { data: fetchSeat, refetch: filledSeatRefetch } = useGetFilledSeatLayoutQuery(adminId, { refetchOnMountOrArgChange: true });
  console.log(attendanceData)
  useEffect(() => {
    if (attendanceData && attendanceData.data) {
      setAttendaceRows(
        attendanceData?.data.map((val: Attendace) => ({
          photo: <img src={img2} alt="Shoes" />,
          name: val.studentName.split(' ')[0],
          seat: val.latestAttendance?.seatNumber ? val.latestAttendance?.seatNumber : 0, // Ensure seat is always a number
          checkin:val.latestAttendance?.checkIn?val.latestAttendance?.checkIn:"NA",
          checkout:val.latestAttendance?.checkOut?val.latestAttendance?.checkOut:"NA",
          status: val.latestAttendance?.isPresent === "Present" ? <span className="green">Present</span> : val.latestAttendance?.isPresent === "Pending" ? <span className="purple">Pending</span> : val.latestAttendance?.isPresent === "Exit"? <span className="grey">Exit</span>:<span className="red">Absent</span>,
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
        const seat = filledSeats?.find((seat: { idx1: number; idx2: number; }) => seat?.idx1 === i && seat?.idx2 === j);
        const className = seat?.isPresent === 'Present' ? 'filled' : seat?.isPresent === 'Pending' ? 'pending' : '';
        row.push(
          <div key={j} className="square">
            {matrix[i][j] && matrix[i][j] !== 0 && matrix[i][j] && matrix[i][j] !== 999 ? (
              <p
                className={`seat ${className}`}
                onClick={() => handleGetSeatStatus(i, j)}
              >{matrix[i][j]}</p>
            ) : matrix[i][j] && matrix[i][j] == 999 ? <p className="gate"><img src={gate}/> </p> : <p className="empty"></p>}
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
    "Today Attendance",
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
  console.log(submitted, isLoadingSeatLayout);
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
      {!data &&
        <Link to="/admin/seats/new" >
          <FaEdit onClick={() => setSubmitted(false)} /> Create Seat Arrangement
        </Link>
      }
      {!isLoadingSeatLayout ?
        <main className="seat-continer">
          <div className="seat-page">
            <h2 className="heading">Seat Layout</h2>
            <div className="seating-arrangement">
              {submitted && (
                <div>
                  {/* <div>
                    <h2 className="heading heading-padding">Seating Arrangement</h2>
                  </div> */}
                  <div className="seat-box">
                    {seatingArrangement()}
                  </div>
                  <div className="footer-des">
                    <div className="seat-details-header">
                      <p>Seat Details</p>
                    </div>
                    <div className="seat-details-box-container">
                      <div className="seat-details-box">
                        <p className="seat-details-box-booked"></p>
                        <label>Booked</label>
                      </div>
                      <div className="seat-details-box">
                        <p className="seat-details-box-availble"></p>
                        <label>Availble</label>
                      </div>
                      <div className="seat-details-box">
                        <p className="seat-details-box-fixed"></p>
                        <label>Fixed Seats</label>
                      </div>
                      <div className="seat-details-box">
                        <p className="seat-details-box-gate"><img src={gate}/></p>
                        <label>Gate</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {isLoadingAttendace ? <Skeleton length={10} /> : Table}
        </main>
        : <Skeleton length={10} />}
      {
        submitted &&
        <div>
          <button className="create-product-btn" onClick={toggle}><FaEdit /></button>
        </div>
      }
      <PopUpModal isOpen={isOpen} toggle={toggle}>
        <SeatsManagement />
      </PopUpModal>
    </div>
  );
};

export default SeatDetails;
