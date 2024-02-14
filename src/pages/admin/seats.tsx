import { ReactElement, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetFilledSeatLayoutQuery, useGetSeatLayoutQuery } from "../../redux/api/seatAPI";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import Attendance from "./attendance";
import SeatDetails from "./management/seatdetails";
// import SeatLayoutHOC from "../../components/admin/SeatLayoutHOC";


const Seats = () => {

    return (
        <div className="admin-container">
            <AdminSidebar />
            <SeatDetails/>
        </div>
    );
};

export default Seats;
