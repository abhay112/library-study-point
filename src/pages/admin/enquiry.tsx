/* eslint-disable no-unsafe-optional-chaining */
import { ReactElement, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import {  useDeleteEnquiryMutation, useGetEnquiryQuery } from "../../redux/api/enquiryAPI";
import { Enquiry } from "../../types/types";
import { responseToast } from "../../utils/features";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  mobile: number;
  shift: string;
  edit:ReactElement;
  delete: ReactElement;
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
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
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
    Header: "Edit",
    accessor: "edit",
  },
  {
    Header: "Delete",
    accessor: "delete",
  },
];

const img = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";
const img2 = "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png";


const Enquiry = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data,isError,error,refetch } = useGetEnquiryQuery(user?._id, { refetchOnMountOrArgChange: true });
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
        data?.enquiries?.map((val: Enquiry) => ({
          avatar: (<img style={{borderRadius: "80%", }} src={`${val?.gender === "Female" ? img2 : img}`} alt="Shoes"/>),
          name: val?.name,
          email: val?.email,
          mobile: val?.mobile,
          gender: val?.gender,
          shift: val?.shift,
          message: val?.message,
          adminId: val?.adminId,
          edit:<Link to={{ pathname:`/admin/enquiry/${val?._id}`}}>Edit</Link>,
          delete: (<Link to={`/admin/enquiry`} onClick={() => deleteHandler(val?._id)}><FaTrash /></Link>),
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
    "dashboard-enquiry-box",
    "Enquiry",
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

export default Enquiry;
