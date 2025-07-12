import React, { Children, useContext, useState } from 'react';
import UserAuthContext from '../../Context/UserAuthContext';
import Loader from '../../components/Loader/Loader'
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {
    const {loading,user}=useContext(UserAuthContext)
    const location=useLocation()
   
    if(loading){
        return <Loader></Loader>
    }
    if (!user){
        return <Navigate to={'/login'} state={{form:location?.pathname}} ></Navigate>
    }
    return children
    
};

export default PrivateRouter;