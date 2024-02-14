/* eslint-disable no-unsafe-optional-chaining */
import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import {  useDeleteEnquiryMutation } from "../../redux/api/enquiryAPI";
import {  Fees } from "../../types/types";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { useGetFeesQuery } from "../../redux/api/feesAPI";

interface DataType {
  avatar: ReactElement;
  name: string;
  gender: string;
  mobile: number;
  shift: string;
  date:string;
  status: ReactElement;
  manage: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Mobile",
    accessor: "mobile"
  },
  {
    Header: "Shift",
    accessor: "shift",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Status",
    accessor: "status",
  },

];

const img = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
const img2 = "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png";


const FeesPage = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data,isError,error,refetch } = useGetFeesQuery(user?._id, { refetchOnMountOrArgChange: true });

  const [deleteQuery] = useDeleteEnquiryMutation();
  const navigate = useNavigate();
  const [rows, setRows] = useState<DataType[]>([]);
 
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    console.log("Data:", data);
    console.log("Rows:", rows);
    if (data) {
      setRows(
        data?.currentFees?.map((val: Fees) => ({
          avatar: (<img style={{borderRadius: "80%", }} src={`${val?.gender === "Female" ? img2 : img}`} alt="Shoes"/>),
          name: val?.studentName,
          mobile: val?.mobile,
          shift: val?.fees.shift,
          date:val?.fees?.date,
          status:val?.fees?.feesStatus?<Link to={{ pathname:`/admin/fees/${val?._id}`}}>Submitted</Link>:<Link to={{ pathname:`/admin/fees/${val?._id}`}}>Due</Link>,
        })),
      );
    }
  }, [data]);
  const deleteHandler = async (id: string) => {
    const res = await deleteQuery({
      adminId: user?._id,
      queryId: id,
    });
    console.log(res);
   refetch();
  };
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-fees-box",
    "Fees",
    rows.length > 6
  )();
  console.log(data);
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/enquiry/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default FeesPage;
