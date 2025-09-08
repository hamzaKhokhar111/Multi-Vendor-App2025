import React, { useEffect } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import {  ActivationPage, BestSellingPage, EventsPage, FAQPage, HomePage, LoginPage, ProductsPage, SignUpPage } from './Route'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { server } from './server';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';

export default function App() {

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
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/events' element={<EventsPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
      
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
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
