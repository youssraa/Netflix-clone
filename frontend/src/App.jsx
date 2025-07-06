import { useEffect, useState } from 'react'
import {Routes ,Route} from "react-router-dom" ;
import HomePage  from "./pages/home/HomePage"
import SignUpPage from './pages/SignupPage';
import  LoginPage from "./pages/LoginPage"
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import {Navigate} from 'react-router-dom';
import { Loader } from 'lucide-react';
function App() {
const {user , isCheckingAuth , authCheck}=useAuthStore();

useEffect(()=>{
  authCheck();
},[authCheck]);
console.log(user)
if(isCheckingAuth){
return(<div className='h-screen'>
  <div className='flex justify-center items-center bg-black h-full'>
   <Loader  className='animate-spin text-red-600 w-10 h-10' />
  </div>
</div> ) 
}
  return (
  <>
    <Routes>
      <Route path="/" element={<HomePage/> }/>
      <Route path="/login" element={!user ?<LoginPage/>: <Navigate to = "/"/>}/>
      <Route path="/signup" element={!user ?<SignUpPage/> : <Navigate to = "/"/>}/>
    </Routes>
  <Footer /> 
  <Toaster/>
  </>
  )
}

export default App
