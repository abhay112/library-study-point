import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";
import { useAllStudentsQuery } from "../../redux/api/studentAPI";

interface DataType {
  photo: ReactElement;
  name: string;
  email:string;
  mobile:string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile",
    accessor: "mobile",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];


const Students = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data,refetch } = useAllStudentsQuery(user?._id , { refetchOnMountOrArgChange: true });
  console.log(data,user?._id,'student');
  const [rows, setRows] = useState<DataType[]>([]);
  useEffect(() => {
    if (data)
      setRows(
        data.students.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          email:i.email,
          mobile:i.mobile,
          action: <Link to={`/admin/student/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);


  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-student-box",
    "Students",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/student/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Students;
