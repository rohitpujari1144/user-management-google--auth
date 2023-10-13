import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './editProfile.css'

function EditProfile() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const [socialMedia, setSocialMedia] = useState(userData.socialMediaHandle)
  const [address, setAddress] = useState(userData.address)
  const [age, setAge] = useState(userData.age)
  const navigate = useNavigate()

  async function submitClick() {
    if ((!socialMedia && !address && !age) || (!socialMedia || !address || !age)) {
      warnToast('Please enter all details')
    }
    else {
      const newProfileDetails = {
        age: age,
        address: address,
        socialMediaHandle: socialMedia,
      }
      try {
        let res = await axios.put(`https://user-management-google-auth-be.onrender.com/users/update?email=${userData.email}`, newProfileDetails)
        sessionStorage.setItem('userData', JSON.stringify(res.data.data))
        successToast()
        setTimeout(() => {
          navigate('/profile')
        }, 3500);
      }
      catch (error) {
        errorToast()
      }
    }
  }

  function successToast() {
    toast.success('Profile successfully updated', {
      position: "bottom-left",
      autoClose: 3000,
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
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function errorToast() {
    toast.error('Something went wrong. Please try again !', {
      position: "bottom-left",
      autoClose: 4000,
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
      <div className="editProfileMainDiv shadow rounded">
        <div className="PhotoMainDiv text-center">
          <div className='photoDiv'>
            <img className='photo' src={userData.photo} alt="Profile" />
          </div>
          <h3 className='text-primary userName'>{userData.name}</h3>
        </div>
        <div className='detailsMainDiv'>
          <div className=''>
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={userData.email} readOnly />
          </div>
          <div className='mt-2'>
            <label htmlFor="socialMedia" className="form-label">Social media handle</label>
            <input type="email" className="form-control" id="socialMedia" aria-describedby="emailHelp" autoComplete='off' defaultValue={socialMedia} onChange={(e) => setSocialMedia(e.target.value)} />
          </div>
          <div className='mt-2'>
            <label htmlFor="address" className="form-label">Address</label>
            <input type="email" className="form-control" id="address" aria-describedby="emailHelp" autoComplete='off' defaultValue={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className='mt-2'>
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" className="form-control" id="age" aria-describedby="emailHelp" autoComplete='off' defaultValue={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className='text-center mt-3'>
            <button type="button" className="btn btn-outline-primary" onClick={() => submitClick()}>Submit</button>
            <h6 className='mt-3 text-primary goToProfile' onClick={() => navigate('/profile')}>Go to Profile</h6>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default EditProfile