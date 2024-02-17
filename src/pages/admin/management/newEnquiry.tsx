/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {  FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useCreateEnquiryMutation } from "../../../redux/api/enquiryAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";

const NewEnquiry = () => {
  const { admin } = useSelector((state: RootState) => state.adminReducer);
  const adminId = admin?._id ||"";
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // const [adminId, setAdminId] = useState<string>(adminId);

  const [createEnquiry] = useCreateEnquiryMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(name, email, mobile, gender, shift, admin?._id);
    if (!name || !email || mobile.length < 10 || !gender || !shift) {
      console.log('error');
      return;
    }
    const formData = {
      name,
      email,
      mobile,
      gender,
      shift,
      message,
      adminId:adminId,
    };
    const res = await createEnquiry({ id: adminId, formData:formData});
    console.log(res);
    responseToast(res, navigate, "/admin/enquiry");
  }

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
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                required
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                required
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div>
              <label>Gender</label>
              <input
                required
                type="text"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div>
              <label>Shift</label>
              <input
                required
                type="text"
                placeholder="Shift"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              />
            </div>
            <div>
              <label>Message</label>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
