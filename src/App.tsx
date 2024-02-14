import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase";
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userAPI';
import { RootState } from "./redux/store";
import ProtectedRoute from './components/protected-route';
import NotFound from './pages/not-found';
import NewEnquiry from './pages/admin/management/newEnquiry';
import Enquiry from './pages/admin/enquiry';
import EnquiryManagement from './pages/admin/management/enquirymanagement';
import Students from './pages/admin/students';
import StudentManagement from './pages/admin/management/studentManagement';
import FeesPage from './pages/admin/fees';
import Seats from './pages/admin/seats';
import SeatsManagement from './pages/admin/management/seatmanagement';
import UserDashboard from './pages/users/dashboard';
import UserSeats from './pages/users/seats';
import UserAttendance from './pages/users/attendance';
import UserFeesPage from './pages/users/fees';
import UserAttendanceManagement from './pages/users/management/attendancemanagement';

const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/orders"));

const Loader = lazy(() => import("./components/loader"));
const Header = lazy(() => import("./components/header"));

//admin route 
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Attendance = lazy(() => import("./pages/admin/attendance"));
const InActive = lazy(() => import("./pages/admin/inactivestudents"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const NewProduct = lazy(() => import("./pages/admin/management/newStudent"));
const AttendanceManagement = lazy(
  () => import("./pages/admin/management/attendancemanagement")
);


const App = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: RootState) => state.userReducer);
  const [authChecked, setAuthChecked] = useState(false);

  // useEffect(()=>{
  //   onAuthStateChanged(auth,async (user)=>{
  //     if(user){
  //       const data = await getUser(user.uid);
  //       console.log('logged in',loading);
  //       dispatch(userExist(data.user));
  //     }else{
  //       console.log('logged out');
  //       dispatch(userNotExist());
  //     }
  //   })
  // },[]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        console.log('logged in', loading);
        dispatch(userExist(data.user));
      } else {
        console.log('logged out');
        dispatch(userNotExist());
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, [dispatch, loading]);

  
  if (!authChecked) {
    return <Loader />
  }
  console.log('loading', loading)

  return (
    <Router>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route>

            <Route path="/shipping" element={<Shipping />} />
            <Route path="/login" element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            } />
            {/* Logged In User Routes */}
            <Route
              element={<ProtectedRoute isAuthenticated={user ? true : false} />}
            >
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/orders" element={<Orders />} />
              {/* <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/pay" element={<Checkout />} /> */}
            </Route>

          </Route>

          {/* //admin Rotues */}

          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/seats" element={<Seats />} />
            <Route path="/admin/attendance" element={<Attendance />} />
            <Route path="/admin/fees" element={<FeesPage />} />
            <Route path="/admin/inActive" element={<InActive />} />
            <Route path="/admin/enquiry" element={<Enquiry />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
          
            {/* Management */}
            <Route path="/admin/student/new" element={<NewProduct />} />
            <Route path="/admin/enquiry/new" element={<NewEnquiry />} />
            <Route path="/admin/enquiry/:id" element={<EnquiryManagement />} />
            <Route path="/admin/student/:id" element={<StudentManagement />} />
            <Route path="/admin/seats/new" element={<SeatsManagement />} />
            <Route path="/admin/attendance/:id" element={<AttendanceManagement />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                userOnly={true}
                user={user?.role === "user" ? true : false}
              />
            }
          >
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/seats" element={<UserSeats />} />
            <Route path="/user/attendance" element={<UserAttendance />} />
            <Route path="/user/fees" element={<UserFeesPage />} />
            {/* Charts */}
            <Route path="/user/chart/bar" element={<Barcharts />} />
            <Route path="/user/chart/pie" element={<Piecharts />} />
            <Route path="/user/chart/line" element={<Linecharts />} />
            {/* Apps */}
          
            {/* Management */}
            <Route path="/user/attendance/:id" element={<UserAttendanceManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App