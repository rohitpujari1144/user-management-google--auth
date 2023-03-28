import React, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

export default function Login() {
    const clientId = '770980726427-3jjusgfet1344c8dkqg568camfqnqqt9.apps.googleusercontent.com'
    const [showLoginButton, setShowLoginButton] = useState(true)
    const [showLogoutButton, setshowLogoutButton] = useState(false)

    const onLoginSuccess = (res) => {
        console.log('Login Success : ', res.profileObj);
        setShowLoginButton(false)
        setshowLogoutButton(true)
    }

    const onFailureSuccess = (res) => {
        console.log('Login Failed : ', res);
    }

    const onSignoutSuccess = () => {
        alert('Signed out successfully')
        setShowLoginButton(true)
        setshowLogoutButton(false)
        console.clear()
    }
    return (
        <div>
            {showLoginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onLoginSuccess}
                    onFailure={onFailureSuccess}
                    cookiePolicy={'single_host_origin'}
                /> : null
            }

            {showLogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    )
}
