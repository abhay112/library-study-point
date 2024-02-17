import { Link } from "react-router-dom";
import {
    FaSignInAlt,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { Admin, User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
    user: User | null;
    admin: Admin | null;
}

const Header = ({ user, admin }: PropsType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Sign Out Successfully");
            setIsOpen(false);
        } catch (error) {
            toast.error("Sign Out Fail");
        }
    };
    return (
        <nav className="header">
            {/* <div> */}
                <Link onClick={() => setIsOpen(false)} to={"/"}>
                    HOME
                </Link>
                {admin?._id &&
                    <>
                        <button onClick={() => setIsOpen((prev) => !prev)}>
                            <FaUser />
                        </button>
                        <dialog open={isOpen}>
                            <div>
                                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                                    Admin
                                </Link>
                                <button onClick={logoutHandler}>
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        </dialog>
                    </>
                }
                {user?._id && (
                    <>
                        <button onClick={() => setIsOpen((prev) => !prev)}>
                            <FaUser />
                        </button>
                        <dialog open={isOpen}>
                            <div>
                                <Link onClick={() => setIsOpen(false)} to="/user/dashboard">
                                    User
                                </Link>
                                <button onClick={logoutHandler}>
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        </dialog>
                    </>
                )}

                {!admin?._id && !user?._id &&<Link to={"/login"}>
                        <FaSignInAlt />
                    </Link> }
            {/* </div> */}

        </nav>
    )
}

export default Header