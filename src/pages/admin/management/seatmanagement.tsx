import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDoneOutline } from "react-icons/md";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useCreateSeatMutation, useGetSeatLayoutQuery } from "../../../redux/api/seatAPI";
import { responseToast } from "../../../utils/features";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
// import SeatLayoutHOC from "../../components/admin/SeatLayoutHOC";

const SeatsManagement = () => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const [rows, setRows] = useState<number | "">("");
    const [columns, setColumns] = useState<number | "">("");
    const [matrix, setMatrix] = useState<number[][]>([]);
    const [gridColors, setGridColors] = useState<string[][]>([]);
    // const [createSeats, setCreateSeats] = useState<boolean>(false);
    const boardRef = useRef<HTMLDivElement>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    // const [seatsMatrix, setSeatsMatrix] = useState<number[][]>([]);
    const [createSeats] = useCreateSeatMutation();
    const { data, isError, error, isLoading } = useGetSeatLayoutQuery(user?._id, { refetchOnMountOrArgChange: true });
    const navigate = useNavigate();

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
    useEffect(() => {

    }, [data]);
    const createSquares = () => {
        if (!matrix.length || !gridColors.length) return null;
        const html: JSX.Element[] = [];
        for (let i = 0; i < Number(rows); i++) {
            const row: JSX.Element[] = [];
            for (let j = 0; j < Number(columns); j++) {
                row.push(
                    <div
                        key={j}
                        className="square"
                        style={{ backgroundColor: gridColors[i][j] ? gridColors[i][j] : "white" }}
                    >
                        <input
                            className="square-box"
                            type="number"
                            value={matrix[i][j]}
                            onChange={(e) => handleInputChange(i, j, e?.target.value)}
                        />
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

    const handleInputChange = (row: number, col: number, value: string) => {
        const newMatrix = matrix?.map((rowArray, rowIndex) =>
            rowIndex === row
                ? rowArray?.map((cell, colIndex) =>
                    colIndex === col ? parseInt(value, 10) : cell
                )
                : rowArray
        );
        setMatrix(newMatrix);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newGridColors = matrix?.map((row) =>
            row.map((value) => (value > 0 ? "red" : "white"))
        );
        setGridColors(newGridColors);
        console.log(newGridColors);
        setSubmitted(true);
        if (!rows || !columns || !matrix) {
            console.log('error');
            return;
        }

        const formData = {
            rows,
            columns,
            matrix,
        }
        const res = await createSeats({ adminId: user?._id, formData: formData });
        responseToast(res, navigate, "/admin/seats");
    };
    const img = "https://png.pngtree.com/png-vector/20220814/ourmid/pngtree-cinema-seat-png-image_6110496.png"
    const img2 = "https://png.pngtree.com/png-vector/20190625/ourmid/pngtree-car-seat-png-image_1511320.jpg"

    const seatingArrangement = () => {
        if (!matrix.length) return null;
        const html: JSX.Element[] = [];
        console.log('seat arrangement')
        for (let i = 0; i < Number(rows); i++) {
            const row: JSX.Element[] = [];
            for (let j = 0; j < Number(columns); j++) {
                row.push(
                    <div key={j} className="square">
                        {matrix[i][j] !== 0 && matrix[i][j] !== 999 ? (
                            <p
                                className="seat"
                                onClick={() => handleGetSeatStatus(i, j)}
                            >{matrix[i][j]}</p>
                        ) : matrix[i][j] == 999 ? 
                            <p className="gate">G</p> : 
                            <p className="empty"></p>}
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
        // Update seat status or perform any other action here
        console.log(`Seat at row ${row}, column ${col} clicked`);
    };
    // console.log(matrix);
    console.log(data, 'seats');
    console.log(submitted, 'seats');
    console.log(matrix, 'seats');
    return (
        <div className="admin-container">
            <AdminSidebar />
            {!isLoading &&
                <main className="seat-page">
                    {/* <SeatLayoutHOC gatePosition={"bottom"}> */}
                    <div className="seats-layout">
                        <div className="page-wrapper">
                            <div className="create-seats-layout">
                                {
                                    !submitted && <div>
                                        <input
                                            type="number"
                                            value={rows === "" ? "" : String(rows)}
                                            onChange={(e) => {
                                                setMatrix([]);
                                                setGridColors([]);
                                                setColumns("");
                                                setRows(e.target.value === "" ? "" : parseInt(e.target.value, 10));
                                            }}
                                            min="1"
                                            placeholder="Enter number of rows"
                                        />
                                        <input
                                            type="number"
                                            value={columns === "" ? "" : String(columns)}
                                            onChange={(e) => setColumns(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
                                            min="1"
                                            placeholder="Enter number of columns"
                                        />
                                    </div>
                                }

                                <div ref={boardRef} className="board">
                                    {!submitted && createSquares()}
                                </div>

                            </div>
                        </div>
                    </div>
                    {submitted && (
                        <div className="seating-arrangement">
                            {seatingArrangement()}
                        </div>
                    )}
                    {!submitted && <button onClick={handleSubmit}>Submit</button>}
                </main>}
            {submitted && <Link to="/admin/seats/new" className="create-product-btn">
                <MdOutlineDoneOutline onClick={() => setSubmitted(false)} />
            </Link>}

        </div>
    );
};

export default SeatsManagement;
