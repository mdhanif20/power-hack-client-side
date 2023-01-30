import React from 'react';
import {  Navigate, Outlet,useLocation} from 'react-router-dom';
import useAuth from '../Firebase/useAuth';


const PrivateRoute = () => {
    let {users} = useAuth();
    const location = useLocation();
    
    return users.email ? <Outlet/> : (
        <Navigate to="/login" replace state={{from: location}} />
    )
};

export default PrivateRoute;