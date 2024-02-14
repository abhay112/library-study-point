/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {  FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useCreateEnquiryMutation, useGetEnquiryQuery, useGetSingleEnquiryQuery, useUpdateEnquiryMutation } from "../../../redux/api/enquiryAPI";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useLocation, useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";

const NewEnquiry = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [adminId, setAdminId] = useState<string>(user?._id);
  const navigate = useNavigate();
  const location = useLocation();
  const enquiryId = location.pathname.split('/').pop() || '';
  const { data,isError,error,refetch } = useGetSingleEnquiryQuery({adminId:user?._id,id:enquiryId});
  console.log(data);

  const { name, email, mobile, gender, shift,message } = data?.enquiries || {
    name: "",
    email: "",
    mobile: "",
    gender:"",  
    shift: "",
    message:"",
  };
  console.log(name,email,mobile,gender,shift,message);
  const [messageUpdate, setMessageUpdate] = useState<string>(message);
  const [createEnquiry] = useCreateEnquiryMutation();
  const [updateEnquiry] = useUpdateEnquiryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(messageUpdate);
    const formData ={
        name,
        email,
        mobile,
        gender,
        shift,
        message:messageUpdate,
    }
    const res = await updateEnquiry({ adminId:user?._id,enquiryId:data?.enquiries?._id,formData:formData});
    console.log(res);
    responseToast(res, navigate, "/admin/enquiry");
  }
  useEffect(() => {
    if (data) {
        setMessageUpdate(data?.enquiries?.message);
    }
  }, [data]);

  console.log(messageUpdate);
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={handleSubmit}>
            <h2>New Enquiry</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                required
                type="text"
                placeholder="Email"
                value={email}
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                required
                type="text"
                placeholder="Mobile"
                value={mobile}
              />
            </div>
            <div>
              <label>Gender</label>
              <input
                required
                type="text"
                placeholder="Gender"
                value={gender}
              />
            </div>
            <div>
              <label>Shift</label>
              <input
                required
                type="text"
                placeholder="Shift"
                value={shift}
              />
            </div>
            <div>
              <label>Message</label>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessageUpdate(e.target.value)}
              />
            </div>
            <button type="submit">Create</button>
            {/* {isError && <div>Error: {error?.message}</div>} */}
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewEnquiry;
