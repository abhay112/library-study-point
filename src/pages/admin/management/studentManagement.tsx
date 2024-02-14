/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { RootState, server } from "../../../redux/store";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDeleteStudentMutation, useStudentDetailsQuery, useUpdateStudentMutation } from "../../../redux/api/studentAPI";
import { responseToast } from "../../../utils/features";

interface RouteParams {
  id: string;
}

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const StudentManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams<RouteParams>();
  const id = params?.id || "";
  const navigate = useNavigate();
  const { data, isLoading, isError,refetch } = useStudentDetailsQuery(id, { refetchOnMountOrArgChange: true });
  console.log(data);
  const { name, email, mobile, shift, feesAmount, active, photo } = data?.student || {
    photo: "",
    name: "",
    email: "",
    mobile: 0,
    shift: "",
    active: true,
    feesAmount: 0,
  };

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [emailUpdate, setEmailUpdate] = useState<string>(email);
  const [mobileUpdate, setMobileUpdate] = useState<number>(Number(mobile));
  const [shiftUpdate, setShiftUpdate] = useState<string>(shift);
  const [feesUpdate, setFeesUpdate] = useState<number>(Number(feesAmount));
  const [activeUpdate, setActiveUpdate] = useState<boolean>(active);

  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [updateStudent] = useUpdateStudentMutation();
  const [deleteProduct] = useDeleteStudentMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (nameUpdate)  formData.set("name", nameUpdate);
    if (emailUpdate) formData.set("email",emailUpdate);
    if (shiftUpdate) formData.set("shift",shiftUpdate);
    if (feesUpdate)  formData.set("feesAmount",feesUpdate.toString());
    if (activeUpdate !== undefined) formData.set("active", activeUpdate.toString());
    if (mobileUpdate !== undefined) formData.set("mobile", mobileUpdate.toString());
    if (photoFile)   formData.set("photo", photoFile);
    const res = await updateStudent({
      formData,
      userId: user?._id || "",
      studentId: data?.student._id || "",
    })
    console.log(res);
    refetch();
    responseToast(res, navigate, "/admin/students");
   
  };

  const deleteHandler = async () => {
    try {
        const res = await deleteProduct({
        userId: user?._id || "",
        studentId: data?.student._id || "",
      }) // unwrap to access the actual response

      responseToast(res, navigate, "/admin/students");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.student.name);
      setEmailUpdate(data.student.email);
      setMobileUpdate(Number(data.student.mobile));
      setShiftUpdate(data.student.shift);
      setFeesUpdate(Number(data.student.feesAmount));
      setActiveUpdate(data.student.active);
    }
  }, [data]);
  console.log(active,activeUpdate);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <img src={`${server}/${photo}`} alt="Student" />
        </section>
        <article>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={emailUpdate}
                onChange={(e) => setEmailUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                type="number"
                placeholder="Mobile"
                value={mobileUpdate}
                onChange={(e) => setMobileUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Shift</label>
              <input
                type="text"
                placeholder="Shift"
                value={shiftUpdate}
                onChange={(e) => setShiftUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Fees</label>
              <input
                type="text"
                placeholder="Fees"
                value={feesUpdate}
                onChange={(e) => setFeesUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Active</label>
              <select
                value={activeUpdate ? "enrolled" : "inactive"}
                onChange={(e) => setActiveUpdate(e.target.value === "enrolled")}
              >
                <option value="enrolled">Enrolled</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default StudentManagement;
