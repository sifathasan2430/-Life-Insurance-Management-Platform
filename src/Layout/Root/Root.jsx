import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';


const Root = () => {
    return (
        <div className='min-h-screen'>
              <Navbar/> 

            <div className='flex-grow '>
                  
             <Outlet />
            </div>
        </div>
    );
};

export default Root;