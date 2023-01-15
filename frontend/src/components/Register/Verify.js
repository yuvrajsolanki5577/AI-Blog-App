import axios from 'axios';
import React, { useEffect } from 'react'

const Verify = () => {

    const handleOTP = async () => {
        try {
            
            const res = await axios.get(`verify-email`);
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        handleOTP();
    
    }, []);

  return (
    <h1>Verify</h1>
  )
}

export default Verify;