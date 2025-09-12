import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  // Dummy cart data
  const cartData = [
    {
      name: "Iphone 14 Pro Max 256GB Silver",
      description: "Best iPhone ever",
      discountPrice: 999,
    },
    {
      name: "Samsung S23 Ultra 512GB",
      description: "Flagship Samsung phone",
      discountPrice: 899,
    },
    {
      name: "MacBook Pro M2 16GB RAM",
      description: "Apple laptop",
      discountPrice: 1299,
    },
  ];

  // Condition check: empty cart
  const isCartEmpty = cartData.length === 0;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        
        {/* Close Button */}
        <div className="flex w-full justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* If Cart Empty */}
        {isCartEmpty ? (
          <div className="h-screen flex items-center justify-center">
            <h5 className="text-[18px] font-[500]">Cart is empty!</h5>
          </div>
        ) : (
          <>
            {/* Items Count */}
            <div className={`${styles.noramlFlex} p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {cartData.length} items
              </h5>
            </div>

            {/* Cart Items */}
            <div className="w-full border-t">
              {cartData.map((i, index) => (
                <CartSingle key={index} data={i} />
              ))}
            </div>

            {/* Checkout Button */}
            <div className="px-5 mb-3">
              <Link to="/checkout">
                <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Single Cart Item
const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    if (value === 1) {
      toast.error("Minimum 1 quantity required!");
      return;
    }
    setValue(value - 1);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        {/* Quantity Buttons */}
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={increment}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={decrement}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>

        {/* Product Image */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png"
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        {/* Product Details */}
        <div className="pl-[5px]">
          <h1 className="font-[500] text-[16px]">{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} × {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>

        {/* Remove Button */}
        <RxCross1
          className="cursor-pointer ml-auto"
          onClick={() => toast.info("Item removed (Dummy Function)")}
        />
      </div>
    </div>
  );
};

export default Cart;
