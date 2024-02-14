import AdminSidebar from "../../components/admin/AdminSidebar";
import SeatDetails from "./management/seatdetails";
const Seats = () => {
    return (
        <div className="admin-container">
            <AdminSidebar />
            <SeatDetails/>
        </div>
    );
};

export default Seats;
