import React from 'react'
import { useNavigate } from "react-router-dom";

function UserDetails() {
    let navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('userData'))

    function logOutClick() {
        sessionStorage.clear();
        navigate('/login')
    }
    return (
        <>
            <div className='shadow rounded p-3 position-absolute top-50 start-50 translate-middle' style={{ width: '20%' }}>
                <div className="text-center">
                    <div className='position-relative top-0 start-50 translate-middle-x' style={{ width: '180px', height: '180px', }}>
                        <img className='' src={userData.photo} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                    </div>
                    <h3 className='text-primary mt-2'>{userData.name}</h3>
                </div>
                <div className='mt-3 d-flex justify-content-evenly'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => navigate(`/profile-details`)}>Edit Profile</button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => logOutClick()}>Log out</button>

                </div>
            </div>
        </>
    )
}

export default UserDetails