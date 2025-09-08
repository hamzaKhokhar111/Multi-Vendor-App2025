import React from "react";
// import styles from "../../styles/styles";
import styles from "../../../styles/styles";
import CountDown from "./CountDown/CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = () => {
//   const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

//   const addToCartHandler = (data) => {
//     const isItemExists = cart && cart.find((i) => i._id === data._id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: 1 };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   }
  return (
    <div
      className={`w-full block bg-white rounded-lg`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        {/* <img src={`${data.images[0]?.url}`} alt="" /> */}
        <img src="https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg"
         alt="" />
      </div> 
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14Pro max 8/256gb</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ipsam fugit pariatur velit odit, error, officia qui eligendi fugiat nostrum dicta doloremque, voluptates nam! Praesentium ratione eveniet illum quibusdam distinctio ut harum, voluptate, ab repellat provident impedit quidem, quo incidunt!</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown  />
        <br />
        <div className="flex items-center">
          <Link to={`/product`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;