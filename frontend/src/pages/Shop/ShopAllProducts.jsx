import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllProducts from '../../components/Shop/AllProducts'

function ShopAllProducts() {
  return (
   <div>
         <DashboardHeader/>
         <div className='flex  justify-between w-full'>
            <div className="800px:w-[300px]">
                <DashboardSideBar active={3} />
            </div>
              <div className="w-full justify-center flex">
               <AllProducts/>
              </div>
         </div>
    </div>
  )
}

export default ShopAllProducts
