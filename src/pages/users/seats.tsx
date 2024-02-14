import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetFilledSeatLayoutQuery, useGetSeatLayoutQuery } from "../../redux/api/seatAPI";
import UserSidebar from "../../components/admin/UserSidebar";
import { useCreateNewStudentAttendanceMutation } from "../../redux/api/attendanceAPI";
import { responseToast } from "../../utils/features";
// import SeatLayoutHOC from "../../components/admin/SeatLayoutHOC";

const UserSeats = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const [rows, setRows] = useState<number | "">("");
    const [columns, setColumns] = useState<number | "">("");
    const [matrix, setMatrix] = useState<number[][]>([]);
    const [gridColors, setGridColors] = useState<string[][]>([]);
    // const [createSeats, setCreateSeats] = useState<boolean>(false);
    const boardRef = useRef<HTMLDivElement>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const { data, isError, error, isLoading } = useGetSeatLayoutQuery(user?._id, { refetchOnMountOrArgChange: true });
    const fetchSeat = useGetFilledSeatLayoutQuery(user?._id, { refetchOnMountOrArgChange: true });
    console.log(fetchSeat?.currentData?.data?.filledSeats, 'fetchSeats');
    const navigate = useNavigate();
    const [createNewStudentAttendance] = useCreateNewStudentAttendanceMutation();

    useEffect(() => {
        if (rows !== "" && columns !== "") {
            const newMatrix = Array.from({ length: Number(rows) }, () =>
                Array.from({ length: Number(columns) }, () => 0)
            );
            const newGridColors = Array.from({ length: Number(rows) }, () =>
                Array.from({ length: Number(columns) }, () => "white")
            );
            setMatrix(newMatrix);
            setGridColors(newGridColors);
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
                row.push(
                    <div key={j} className="square">
                        {matrix[i][j] !== 0 && matrix[i][j] !== 999 ? (
                            <p
                                className={`seat ${className}`}
                                onClick={() => handleGetSeatStatus(i, j,matrix[i][j])}
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


    const handleGetSeatStatus = async(idx1: number, idx2: number,seatNumber:number) => {
        const confirmed = window.confirm(`You have selected ${seatNumber}th seat`);
        if (confirmed) {
            const formData = {
                idx1:idx1,
                idx2:idx2,
            }
            const res = await createNewStudentAttendance({studentId:user?._id,formData});
            responseToast(res, navigate, "/user/attendance");
            console.log(res);
        }

    };
    console.log(user?._id)
    return (
        <div className="admin-container">
            <UserSidebar />
            {data ?
                <main>
                    <div className="seat-page">
                        <div className="seating-arrangement">
                            {submitted && (
                                <div><div><h2 className="heading heading-padding">Seating Arrangement</h2></div>
                                    {seatingArrangement()}</div>
                            )}
                        </div>
                    </div>
                </main> :
                <Link to="/user/seats/new" >
                    <FaEdit onClick={() => setSubmitted(false)} /> Create Seat Arrangement
                </Link>}
            {submitted && <Link to="/user/seats/new" className="create-product-btn">
                <FaEdit onClick={() => setSubmitted(false)} />
            </Link>}

        </div>
    );
};

export default UserSeats;
