import React, { useEffect } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import {  ActivationPage, BestSellingPage, CheckoutPage, EventsPage, FAQPage, HomePage, LoginPage, ProductDetailsPage, ProductsPage, ProfilePage,  SellerActivationPage,  ShopCreatePage, SignUpPage } from './Route'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { server } from './server';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';
// import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
 const { loading , isAuthenticated}= useSelector((state)=> state.user);

  useEffect(()=>{
    Store.dispatch(loadUser());
  })


  return (
    <BrowserRouter>
     <Routes>
      
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
      <Route path='/products' element={<ProductsPage/>}/>
      <Route path='/product/:name' element={<ProductDetailsPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/events' element={<EventsPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
      <Route path='/seller' element={<ShopCreatePage/>}/>

     <Route
     path='/checkout'
     element={
      <ProtectedRoute isAuthenticated={isAuthenticated}>
     <CheckoutPage/>
      </ProtectedRoute>
     }
     />

      <Route path='/profile' element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ProfilePage />
        </ProtectedRoute>
      }/>
      
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/>

      <Route path='/activation/seller/:activation_token' element={<SellerActivationPage/>}/>

      </Routes>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  )
}
