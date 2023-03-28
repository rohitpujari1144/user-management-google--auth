import { Helmet } from 'react-helmet';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

function Login() {

    const [user, setUser] = useState({});
    console.log(user);
    let navigate = useNavigate()

    function loginAsAdmin() {
        navigate('/signin/adminsignin')
    }

    const res = (res) => {
        // console.log(res)
        var userObject = jwtDecode(res.credential);
        // console.table(userObject);
        setUser(userObject);

        fetch('https://react-google-login-be.onrender.com')
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                const newData = data.filter((e) => e.email === userObject.email)
                // console.log(newData);

                if (newData.length === 0) {
                    const userLoginData = {
                        name: userObject.name,
                        email: userObject.email,
                        address: '',
                        age: '',
                        socialMediaHandle: '',
                        picture: userObject.picture
                    }
                    // console.log(userLoginData);
                    fetch('https://react-google-login-be.onrender.com/createUser', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userLoginData),
                    })
                        .then((response) => console.log(response))
                        .then((data) => {
                            console.log(data);
                            console.log('Success : ', userLoginData);
                            let userLData = [{
                                name: userObject.name,
                                email: userObject.email,
                                address: '',
                                age: '',
                                socialMediaHandle: '',
                                picture: userObject.picture
                            }]
                            localStorage.setItem("userDetails", JSON.stringify(userLData))
                            navigate('/registration')
                        })
                        .catch((error) => {
                            console.error('Error : ', error)
                        })
                }
                else {
                    // console.log(newData);
                    localStorage.removeItem('userDetails')
                    localStorage.setItem('userDetails', JSON.stringify(newData))
                    navigate('/user-details')
                }
            })
    }

    const err = (error) => {
        console.log(error)
    }

    return (
        <>
            <Helmet>
                <title>User Management | Login</title>
            </Helmet>
            <div className='loginDiv container mt-5 p-3 d-flex flex-column lign-item-center justify-content-center' style={{ border: '2px solid purple', borderRadius: '6px', width: 'fit-content', }}>
                <div className='my-2'>
                    <GoogleLogin onSuccess={res} onError={err} />
                </div>
                <div className='my-2 d-flex justify-content-center'>
                    <button className="btn btn-outline-primary " type="submit" onClick={() => loginAsAdmin()}>
                        Log In as Admin
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login