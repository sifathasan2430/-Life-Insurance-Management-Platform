import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';


const Root = () => {
    return (
        <div className="min-h-screen flex flex-col  bg-gray-50">
              <Navbar/> 

            <div className='flex-grow '>
                  
             <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default Root;