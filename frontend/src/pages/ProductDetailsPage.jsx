import React, { useEffect, useState } from 'react'
import Header from '../components/Login/Layout/Header'
import Footer from '../components/Login/Layout/Footer'
import ProductDetails from '../components/products/ProductDetails'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProduct from '../components/products/SuggestedProduct'

function ProductDetailsPage() {
  const { name } = useParams();
  const [data, setData] = useState(null);

  // URL param se productName banaye
  const productName = name.replace(/-/g, "");

  console.log("Product slug:", productName);

  useEffect(() => {
    const product = productData.find(
      (i) => i.name.replace(/\s/g, "").toLowerCase() === productName.toLowerCase()
    );
    setData(product);
  }, [name]);

  
  return (
    <div>
      <Header />
      
      <ProductDetails data={data} />
      {
        data &&  <SuggestedProduct  data={data}/>
      }
      <Footer />
    </div>
  )
}

export default ProductDetailsPage;
