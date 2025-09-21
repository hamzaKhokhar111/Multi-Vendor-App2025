import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Login/Route/ProductCard/ProductCard";
import styles from "../../styles/styles";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState([]);

  
  useEffect(() => {
    if (allProducts?.length > 0 && data) {
      // Related products filter
      const related = allProducts.filter(
        (i) => i.category === data.category && i._id !== data._id
      );
      setProductData(related);
    }
  }, [allProducts, data]);

  return (
    data && (
      <div className={`p-4 ${styles.section}`}>
        <h2
          className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
        >
          Related Products
        </h2>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {productData.length > 0 ? (
            productData.map((i) => <ProductCard data={i} key={i._id} />)
          ) : (
            <p>No related products found...</p>
          )}
        </div>
      </div>
    )
  );
};

export default SuggestedProduct;
