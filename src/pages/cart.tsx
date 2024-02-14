import { Link } from "react-router-dom";
import CartItem from "../components/cart-item";
import { VscError } from "react-icons/vsc";

const cartItems = [
  {
    productId:"adasd",
    photo:"https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71vFKBpKakL._SX679_.jpg",
    name:"mac",
    price:200,
    quantity:4,
    stock:10,
  }
];

const subtotal = 10000;
const tax = 123;
const shippingCharges = 200;
const discount = 300;
const total = 1000;

const couponCode = true;
const isValidCouponCode = true;

const Cart = () => {
  return (
    <div className="cart">
      <main>
        {
          cartItems?.map((i,idx)=>(
            <CartItem key={idx} cartItem={i}/>
          ))
        }
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={"as"}
          
        />

         {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;