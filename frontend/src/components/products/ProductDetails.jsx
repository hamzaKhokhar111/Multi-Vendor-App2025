import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { getImageUrl } from "../../server";
import { getAllProductsShop } from "../../redux/actions/product";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  // console.log("products data from ProductDetail data is here .. : ", data)
  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop._id));
  }, [dispatch, data]);

  const incrementCount = () => setCount(count + 1);

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishlistHandler = () => {
    setClick(false);
    toast.info("Removed from wishlist");
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = () => {
    setClick(true);
    toast.success("Added to wishlist");
    // dispatch(addToWishlist(data));
  };

  const addToCartHandler = () => {
    if (data.stock < 1) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...data, qty: count };
      // dispatch(addTocart(cartData));
      toast.success("Item added to cart successfully!");
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/* Left Images */}
              <div className="w-full 800px:w-[50%]">
                <img
                  src={getImageUrl(data?.images?.[select])}
                  alt={data.name}
                  className="w-[80%] max-h-[400px] object-contain mx-auto"
                />
                <div className="w-full flex flex-wrap">
                  {data.images &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index ? "border-2 border-red-500" : ""
                        } cursor-pointer`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={getImageUrl(i)}
                          alt=""
                          className="h-[100px] w-[100px] object-cover mr-2 mt-3"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Right Details */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  {data.originalPrice && (
                    <h3 className={`${styles.price}`}>{data.originalPrice}$</h3>
                  )}
                </div>

                {/* Quantity + Wishlist */}
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-teal-500 text-white font-bold px-4 py-2 rounded-l hover:opacity-75"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-teal-500 text-white font-bold px-4 py-2 rounded-r hover:opacity-75"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={removeFromWishlistHandler}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={addToWishlistHandler}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={addToCartHandler}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                {/* Seller Info */}
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <img
                       src={getImageUrl(data?.images?.[select])}
                      alt="heloo"
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data?.shop?.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">(4.5/5) Ratings</h5>
                  </div>
                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Info */}
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      {/* Tabs */}
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        {["Product Details", "Product Reviews", "Seller Information"].map(
          (tab, index) => (
            <div key={index} className="relative">
              <h5
                className={`text-[#000] text-[18px] px-1 font-[600] cursor-pointer ${
                  active === index + 1 ? "text-red-500" : ""
                }`}
                onClick={() => setActive(index + 1)}
              >
                {tab}
              </h5>
            </div>
          )
        )}
      </div>

      {/* Product Details */}
      {active === 1 && (
        <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
          {data.description}
        </p>
      )}

      {/* Reviews */}
      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data?.reviews && data.reviews.length > 0 ? (
            data.reviews.map((item, index) => (
              <div key={index} className="w-full flex my-2">
                <img
                  src={item?.user?.avatar?.url}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2">
                  <h1 className="font-[500] mr-3">{item?.user?.name}</h1>
                  <p>{item?.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <h5>No Reviews for this product!</h5>
          )}
        </div>
      )}

      {/* Seller Info */}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data?.shop?._id}`}>
              <div className="flex items-center">
                <img
                  src={getImageUrl(data?.images?.[0])}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                  <h5 className="pb-2 text-[15px]">(4.5/5) Ratings</h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data?.shop?.description}</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">20</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{data?.reviews?.length || 0}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
