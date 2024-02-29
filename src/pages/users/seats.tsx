/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetFilledSeatLayoutQuery, useGetSeatLayoutQuery } from "../../redux/api/seatAPI";
import UserSidebar from "../../components/admin/UserSidebar";
import { useCheckOutFromLibraryMutation, useCreateNewStudentAttendanceMutation, useGetStudentTodayAttendanceAndSeatNumberQuery } from "../../redux/api/attendanceAPI";
import { responseToast } from "../../utils/features";
import gate from '../../assets/gate.png';
// import SeatLayoutHOC from "../../components/admin/SeatLayoutHOC";

const UserSeats = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const userId = user?._id || "";
    // console.log(userId,user);
    const [rows, setRows] = useState<number | "">("");
    const [columns, setColumns] = useState<number | "">("");
    const [matrix, setMatrix] = useState<number[][]>([]);

    const boardRef = useRef<HTMLDivElement>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { data } = useGetSeatLayoutQuery(userId, { refetchOnMountOrArgChange: true });
    const fetchSeat = useGetFilledSeatLayoutQuery(userId, { refetchOnMountOrArgChange: true });
    const seatData = useGetStudentTodayAttendanceAndSeatNumberQuery(userId, { refetchOnMountOrArgChange: true });
    // console.log(fetchSeat?.currentData?.data?.filledSeats, 'fetchSeats');
    // console.log(fetchSeat, data);
    console.log(seatData);
    let presentStuIdx1: number | null | undefined = null;
    let presentStuIdx2: number | null | undefined = null;
    let exit;
    if (seatData) {
        presentStuIdx1 = seatData?.data?.data?.idx1;
        presentStuIdx2 = seatData?.data?.data?.idx2;
        exit = seatData?.data?.data?.isPresent === "Exit"?true:false;
    }
    console.log(presentStuIdx1, presentStuIdx2);
    const navigate = useNavigate();
    const [createNewStudentAttendance] = useCreateNewStudentAttendanceMutation();
    const [checkOutFromLibrary] = useCheckOutFromLibraryMutation();

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
        const filledSeats = fetchSeat?.currentData?.data?.filledSeats || [];
        for (let i = 0; i < Number(rows); i++) {
            const row: JSX.Element[] = [];
            for (let j = 0; j < Number(columns); j++) {
                const seat = filledSeats.find((seat: { idx1: number; idx2: number; }) => seat.idx1 === i && seat.idx2 === j);
                const className = seat?.isPresent === 'Present' ? 'filled' : seat?.isPresent === 'Pending' ? 'pending' : '';
                const presentSeatClass = i === presentStuIdx1 && j === presentStuIdx2 ? 'highlighted-seat' : ''; // Apply custom class name here
                row.push(
                    <div key={j} className="square">
                        {matrix[i][j] !== 0 && matrix[i][j] !== 999 ? (
                            <p
                                className={`seat ${className} ${presentSeatClass}`}
                                onClick={() => handleGetSeatStatus(i, j, matrix[i][j])}
                            >{matrix[i][j]}</p>
                        ) : matrix[i][j] == 999 ? <p className="gate"><img src={gate}/></p> : <p className="empty"></p>}
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


    const handleGetSeatStatus = async (idx1: number, idx2: number, seatNumber: number) => {
        const confirmed = window.confirm(`You have selected ${seatNumber}th seat`);
        if (confirmed) {
            const formData = {
                idx1: idx1,
                idx2: idx2,
            }
            const res = await createNewStudentAttendance({ studentId: userId, formData });
            responseToast(res, navigate, "/user/attendance");
        }

    };
    // console.log(data)
    const updateHandler=async()=>{
        const res = await checkOutFromLibrary({
            studentId: userId,
          });
          responseToast(res, navigate, "/user/attendance");
    }
    return (
        <div className="admin-container">
            <UserSidebar />
            <div className="seat-arrangement-page">
                {data &&
                    <main className="seat-continer">
                        <div className="seat-page">
                        <h2 className="heading heading-padding">Seating Arrangement</h2>
                            <div className="seating-arrangement">
                                {submitted && (
                                    <div>
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
                                                    <p className="seat-details-box-my-seat"></p>
                                                    <label>My Seat</label>
                                                </div>
                                                <div className="seat-details-box">
                                                    <p className="seat-details-box-request-seat"></p>
                                                    <label>Requested Seat</label>
                                                </div>
                                                <div className="seat-details-box">
                                                    <p className="seat-details-box-fixed"></p>
                                                    <label>Fixed Seats</label>
                                                </div>
                                                <div className="seat-details-box">
                                                    <p className="seat-details-box-availble"></p>
                                                    <label>Availble</label>
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
                            <button onClick={updateHandler} className={`checkout-btn ${!exit?"checkOut":"CheckIn"}`}> {!exit?"Check Out":"Check In"}</button>
                    </main>}
            </div>
        </div>

    );
};

export default UserSeats;
