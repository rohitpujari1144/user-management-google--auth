import React from 'react'
import { useNavigate } from "react-router-dom";
import './userDetails.css'

function UserDetails() {
    let navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('userData'))

    function logOutClick() {
        sessionStorage.clear();
        navigate('/login')
    }
    return (
        <>
            <div className='userDetailsMainDiv shadow rounded'>
                <div className="text-center">
                    <div className='photoDiv'>
                        <img className='photo' src={userData.photo} alt="Profile" />
                    </div>
                    <h3 className='text-primary userName'>{userData.name}</h3>
                </div>
                <div className='buttonMainDiv'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/profile-details`)}>Edit Profile</button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => logOutClick()}>Log out</button>
                </div>
            </div>
        </>
    )
}

export default UserDetails