import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateEvent from '../../components/Shop/CreateEvent'

function ShopCreateEvents() {
  return (
    <div>
         <DashboardHeader/>
         <div className='flex  justify-between w-full'>
            <div className="800px:w-[300px]">
                <DashboardSideBar active={6} />
            </div>
              <div className="w-full justify-center flex">
               <CreateEvent/>
              </div>
         </div>
    </div>
  )
}

export default ShopCreateEvents
