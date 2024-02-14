// import toast from "react-hot-toast";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { Skeleton } from "../components/loader";
// import ProductCard from "../components/product-card";
import { useAllStudentsQuery } from "../redux/api/studentAPI";
import { RootState } from "@reduxjs/toolkit/query";
// import { addToCart } from "../redux/reducer/cartReducer";
// import { CartItem } from "../types/types";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError } = useAllStudentsQuery(user?._id);
  console.log(data,isLoading,isError);
  // const dispatch = useDispatch();

  // const addToCartHandler = (cartItem: CartItem) => {
  //   if (cartItem.stock < 1) return toast.error("Out of Stock");
  //   dispatch(addToCart(cartItem));
  //   toast.success("Added to cart");
  // };

  // if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {/* {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.students.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )} */}
      </main>
    </div>
  );
};

export default Home;
