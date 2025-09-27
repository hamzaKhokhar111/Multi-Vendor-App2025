import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../server";
import styles from "../../../styles/styles";

const EventCard = ({ data }) => {
  return (
    <div className="w-full block bg-white rounded-lg shadow p-4">
      {/* Image */}
      <div className="w-full flex justify-center">
        <img
          src={getImageUrl(data?.images?.[0])}
          alt={data?.name}
          className="w-[200px] h-[200px] object-cover rounded-lg"
        />
      </div>

      {/* Details */}
      <div className="mt-4">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{data?.description}</p>

        {/* Prices */}
        <div className="flex py-2 justify-between items-center">
          <div className="flex items-center gap-2">
            <h5 className="font-medium text-[16px] text-gray-500 line-through">
              Rs {data?.originalPrice}
            </h5>
            <h5 className="font-bold text-[18px] text-[#d55b45]">
              Rs {data?.discountPrice}
            </h5>
          </div>
          <span className="font-[400] text-[15px] text-[#44a55e]">
            {data?.sold_out} sold
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center mt-3 gap-4">
          <Link to={`/product/${data?._id}`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff]`}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
