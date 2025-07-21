import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {Menu, Search , LogOut} from "lucide-react";
import {useAuthStore} from "../store/authUser"
import {useContentStore} from "../store/content";

function Navbar() {
    const {contentType , setContentType}= useContentStore();

    const[isMobileMenuOpen , setIsMobileMenuOpen ] = useState(false);
    const {logout , user}=useAuthStore();
    const toggoleMobileMenu = ()=>{
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  return (
    <header className='maw-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20' >
        <div className='flex items-center gap-10 z-50'>
            <Link to="/">
            <img src="/netflix-logo.png" alt="netflix-log" className='w-32 sm:w-40 '/>
            </Link>
            {/* Navbr desktop items  */}
            <div className='hidden sm:flex gap-2 items-center' >
                <Link to="/" className='hover:underline' onClick={() => setContentType("movie")}>
                 Movies 
                </Link>
                <Link to="/" className='hover:underline'onClick={() => setContentType("tv")}>
                 Tv Shows
                </Link>
                <Link to="/history" className='hover:underline'>
                 Search History
                </Link>     
            </div>
        </div>
        <div className='flex gap-2 items-center z-50'>
            <Link to="/search" >
            <Search className='size-6 cursior-pointer'/>
            </Link>
            <img src={user.image} alt="avatar" className='h-8 rounded cursor-pointer'/>
            <LogOut className='size-6 cursor-pointer ' onClick={logout}/>
            <div className='sm:hidden '>
                <Menu className='size-6 cursor-pointer  ' onClick={toggoleMobileMenu

                } />

            </div>
        </div>
        {/* navbar mobile items */}
        {isMobileMenuOpen && 
        <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800 '>
            <Link to="/"  className='block hover:underline p-2'
            onClick={toggoleMobileMenu}>
                Movies 
            </Link> 
               <Link to="/"  className='block hover:underline p-2'
            onClick={toggoleMobileMenu}>
                Tv Shows
            </Link> 
               <Link to="/history"  className='block hover:underline p-2'
            onClick={toggoleMobileMenu}>
                Search History 
            </Link> 
        </div>
        }

    </header>
  )
}

export default Navbar