import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import TableHOC from "../../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useGetUserFeesQuery, useSubmitDueFeesMutation } from "../../../redux/api/feesAPI";
import { responseToast } from "../../../utils/features";

interface DataType {
  amount?: string;
  date?: string;
  feesStatus?: ReactElement;
  month?:string;
  shift?: string;
  year?: number;
}
interface FeesEntry {
  amount: string | null;
  date: string | null;
  feesStatus:string | null;
  month: string | null;
  shift: string | null;
  year: number | null;
}


const columns: Column<DataType>[] = [
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Date",
    accessor: "date",
  },

  {
    Header: "Month",
    accessor: "month",
  },
  {
    Header: "Shift",
    accessor: "shift",
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "Fees Status",
    accessor: "feesStatus",
  },
];

const FeesManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const studentId = location.pathname.split('/').pop() || '';
  const { admin } = useSelector((state: RootState) => state.adminReducer);
  const adminId = admin?._id ||"";
  const { data } = useGetUserFeesQuery({_id:studentId,adminId:adminId},{ refetchOnMountOrArgChange: true });
  const [submitDueFees] = useSubmitDueFeesMutation();
  let studentName: string ="";
  if (data && Array.isArray(data.fees)) {
    studentName = data.fees[0]?.studentName;
  }
  const handleSubmitFees=async()=>{
    let feesId ;
    if (data && Array.isArray(data.fees)) {
      feesId = data.fees[0]?._id;
    }
    const confirmed = window.confirm(`are you sured to submit ${studentName} his fees`);
    if (confirmed) {
      const res = await submitDueFees({feesId});
      responseToast(res, navigate, "/admin/fees");
    }
  }
  
  const [rows, setRows] = useState<DataType[]>([]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    studentName?studentName:"",
    rows.length > 6
  )();
  useEffect(() => {
  if (data) {
    if (Array.isArray(data.fees)) {
      const fees: FeesEntry[] = data.fees[0]?.fees || [];
      setRows(
        fees.map((entry) => ({
          amount: entry.amount || "",
          date: entry.date || "",
          feesStatus: entry?.feesStatus? <Link to="#">Submitted</Link>: <button onClick={handleSubmitFees}>Due</button>,
          month: entry.month || "",
          shift: entry.shift || "",
          year: entry.year || 0,
        }))
      );
    }
  }
}, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      {Table}
      {/* {isLoading ? <Skeleton length={20} /> : Table} */}
    </div>
  );
};

export default FeesManagement;
