import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './adminSignin.css'

function AdminSignIn() {
  let navigate = useNavigate();
  const adminpassword = "Admin@123";

  function loginAsAdmin() {
    const pw = document.getElementById("adminpw");

    if (pw.value === '') {
      warnToast('Please enter password')
    }
    else {
      if (pw.value === adminpassword) {
        successToast()
        setTimeout(() => {
          navigate("/admin");
        }, 3000);
      }
      else {
        warnToast('Invalid password')
      }
    }
  }

  function successToast() {
    toast.success('Login successful', {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function warnToast(msg) {
    toast.warn(msg, {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <div className='adminSigninMainDiv border border-primary rounded'>
        <h4 className="text-center" style={{ fontFamily: 'Arial' }}>Login as Admin</h4>
        <div className="row text-center p-3">
          <TextField id="adminpw" label="Password" size="small" type="password" />
          <Button className="mt-3" variant="outlined" onClick={() => loginAsAdmin()}>Login</Button>
        </div>
        <p className="ms-1">Password: Admin@123</p>
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminSignIn;