import React, { useEffect, useState } from 'react';
import Header from '../components/Login/Layout/Header';
import Footer from '../components/Login/Layout/Footer';
import ProductDetails from '../components/products/ProductDetails';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/products/SuggestedProduct';
import { useSelector } from 'react-redux';

function ProductDetailsPage() {
  const { allProducts } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState(null);

  // URL param ko normalize karna (slug me "-" ko space ke equal treat karna)
  const productName = name.replace(/-/g, "").toLowerCase();

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const product = allProducts.find(
        (i) => i.name.replace(/\s/g, "").toLowerCase() === productName
      );
      setData(product || null);
    }
  }, [name, allProducts]); // ✅ yahan fix kiya

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;
