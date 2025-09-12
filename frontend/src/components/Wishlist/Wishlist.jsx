import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  // Dummy wishlist data
  const wishlistData = [
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

  const isWishlistEmpty = wishlistData.length === 0;

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        
        {/* Close Button */}
        <div className="flex w-full justify-end pt-5 pr-5">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => setOpenWishlist(false)}
          />
        </div>

        {/* If Wishlist Empty */}
        {isWishlistEmpty ? (
          <div className="h-screen flex items-center justify-center">
            <h5 className="text-[18px] font-[500]">Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            {/* Items Count */}
            <div className={`${styles.noramlFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlistData.length} items
              </h5>
            </div>

            {/* Wishlist Items */}
            <div className="w-full border-t">
              {wishlistData.map((i, index) => (
                <WishlistSingle key={index} data={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Single Wishlist Item
const WishlistSingle = ({ data }) => {
  const [value] = useState(1); // Wishlist me quantity nahi hoti, lekin Add to Cart ke liye rakh rahe hain
  const totalPrice = data.discountPrice * value;

  const addToCartHandler = () => {
    toast.success(`${data.name} added to cart!`);
  };

  const removeFromWishlistHandler = () => {
    toast.info(`${data.name} removed from wishlist!`);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        {/* Remove Button */}
        <RxCross1
          className="cursor-pointer"
          onClick={removeFromWishlistHandler}
        />

        {/* Product Image */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png"
          alt=""
          className="w-[100px] h-min ml-2 mr-2 rounded-[5px]"
        />

        {/* Product Details */}
        <div className="pl-[5px] flex-1">
          <h1 className="font-[500] text-[16px]">{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>

        {/* Add to Cart Button */}
        <div>
          <BsCartPlus
            size={22}
            className="cursor-pointer"
            title="Add to cart"
            onClick={addToCartHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
