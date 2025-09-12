import React, { useEffect } from 'react'
import SignUp from '../components/Login/SignUp/SignUp'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
   const  navigate= useNavigate();
  const {isAuthenticated}= useSelector((state)=>state.user);

  useEffect(()=>{
    if(isAuthenticated===true){
      navigate("/");
    }
  },[])
  return (
    <>
    
    <SignUp/>
   
    </>
  )
}

export default SignUpPage