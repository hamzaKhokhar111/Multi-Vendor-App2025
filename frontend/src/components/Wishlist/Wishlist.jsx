import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import { getImageUrl } from "../../server";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  console.log("wISH LIST ," , wishlist)

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
    toast.info(`${data.name} removed from wishlist 🗑️`, {
      position: "top-center",
    });
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    toast.success(`${data.name} added to cart 🛒`, {
      position: "top-center",
    });
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {!wishlist?.length ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="text-[18px] font-[500]">Wishlist is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              {/* Close Button */}
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>

              {/* Item length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist.length} items
                </h5>
              </div>

              {/* Wishlist Items */}
              <div className="w-full border-t">
                {wishlist.map((i, index) => (
                  <WishlistSingle
                    key={index}
                    data={i}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center">
        {/* Remove Button */}
        <RxCross1
          className="cursor-pointer mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
        />

        {/* Product Image */}
        <img
          // src={data?.images?.[0]?.url}
          src={getImageUrl(data?.images?.[0])}
          alt={data.name}
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        {/* Product Details */}
        <div className="pl-[5px] flex-1">
          <h1 className="font-[500] text-[16px]">{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${data.discountPrice}
          </h4>
        </div>

        {/* Add to Cart */}
        <BsCartPlus
          size={22}
          className="cursor-pointer"
          title="Add to cart"
          onClick={() => addToCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Wishlist;
