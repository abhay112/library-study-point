import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNewStudentMutation } from "../../../redux/api/studentAPI";

const NewStudent = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userId = user?._id || ""
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [feesAmount, setFeesAmount] = useState<number | null>(null);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();


  const [newStudent] = useNewStudentMutation();

  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };
  console.log(photo, 'photo')
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !shift || !feesAmount || !photo) {
      if (mobile !== undefined && mobile !== null && mobile.toString().length < 10) {
        return;
      }
    }
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("mobile", mobile?.toString() || '');
    formData.set("shift", shift);
    formData.set("feesAmount", feesAmount?.toString() || '');
    formData.set("photo", photo || '');

    const res = await newStudent({ id: userId, formData });
    console.log(res);
    responseToast(res, navigate, "/admin/students");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Student</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail((e.target.value))}
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                type="number"
                placeholder="Mobile"
                value={mobile === undefined ? '' : mobile}
                onChange={(e) => {
                  const input = e.target.value;
                  setMobile(input === '' || isNaN(Number(input)) ? "" : input);
                }}
              />
            </div>
            <div>
              <label>Shift</label>
              <input
                type="text"
                placeholder="eg. Morning,Evening,Full Day etc"
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              />
            </div>
            <div>
              <label>Fees</label>
              <input
                type="number"
                placeholder="Fees"
                value={feesAmount === null ? '' : feesAmount} // Adjusted to check for null explicitly
                onChange={(e) => {
                  const input = e.target.value;
                  setFeesAmount((input === '' || isNaN(Number(input))) ? null : Number(input)); // Change undefined to null
                }}
              />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewStudent;
