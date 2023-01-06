import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({Component}) {
  
  const Navigate = useNavigate();  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    
    if(!user){
      Navigate('/');
    }

  }, []);
  

  return (
    <Component />
  )
}

export default ProtectedRoute;