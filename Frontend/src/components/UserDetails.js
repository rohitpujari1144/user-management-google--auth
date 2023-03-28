import React from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";

function UserDetails() {
    let navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate('/login')
    }

    function editDetailsClick() {
        navigate(`/edit-profile`);
    }

    const userD = JSON.parse(localStorage.getItem('userDetails'))
    return (
        <>
            <Helmet>
                <title>User Management | Account</title>
            </Helmet>
            <div className="container mt-5 border-0 shadow rounded-3" style={{ borderRadius: '6px', maxWidth: 'fit-content' }}>
                <h3 className='m-3 text-info'>Welcome {userD[0].name}</h3>
                <div style={{ textAlign: 'center' }} >
                    <img src={userD[0].picture} alt='user profile' className='rounded-circle' />
                </div>
                <div className="d-flex mt-2 mb-2">
                    <div className="m-2 ms-5" id="signindiv">
                        <button className="btn btn-outline-primary" type="submit" onClick={() => { editDetailsClick() }}>
                            Edit Details
                        </button>
                    </div>
                    <div className="m-2" id="signindiv">
                        <button className="btn btn-outline-warning" type="submit" onClick={() => { logout() }}>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDetails