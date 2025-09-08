import React from 'react'
import styles from '../styles/styles'
import Header from '../components/Login/Layout/Header'
import Hero from '../components/Login/Route/Hero/Hero'
import Categories from '../components/Login/Route/Hero/Categories/Categories'
import BestDeals from '../components/Login/Route/Hero/BestDeals/BestDeals'
import FeaturedProduct from '../components/Login/Route/FeaturedProduct/FeaturedProduct'
import Events from '../components/Login/Events/Events'
import Sponsored from '../components/Login/Route/Sponsored'
import Footer from '../components/Login/Layout/Footer'

function HomePage() {
  return (
    <div className={`${styles.section}`}>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProduct/>
        <Sponsored/>
        <Footer/>
        
      
    </div>
  )
}

export default HomePage