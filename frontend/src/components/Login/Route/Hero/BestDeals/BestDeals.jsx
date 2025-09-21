import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductCard from "../ProductCard/ProductCard";
import ProductCard from "../../ProductCard/ProductCard";
import styles from "../../../../../styles/styles";
import { productData } from "../../../../../static/data";
import { getAllProducts } from "../../../../../redux/actions/product";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts()); // ✅ load all products
  }, [dispatch]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const sorted = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      setData(sorted.slice(0, 5));
    }
  }, [allProducts]);

  // console.log("Prooo ", data);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.length !== 0 && (
            <>
              {data.map((i, index) => (
  <ProductCard data={i} indexNo={index} key={index} />
))}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
