import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login() {
    let navigate = useNavigate()

    const res = async (res) => {
        var userObject = jwtDecode(res.credential);
        try {
            let res = await axios.get(`https://user-management-google-auth-be.onrender.com/users/get?email=${userObject.email}`)
            if (res.data.address === '' || res.data.age === '' || res.data.socialMediaHandle === '') {
                sessionStorage.setItem('userData', JSON.stringify(res.data))
                successToast('Login successful')
                setTimeout(() => {
                    navigate('/profile-details')
                }, 3500);
            }
            else {
                sessionStorage.setItem('userData', JSON.stringify(res.data))
                successToast('Login successful')
                setTimeout(() => {
                    navigate('/profile')
                }, 3500);
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    let signupData = {
                        name: `${userObject.given_name} ${userObject.family_name}`,
                        email: userObject.email,
                        address: '',
                        age: '',
                        socialMediaHandle: '',
                        photo: userObject.picture
                    }
                    try {
                        await axios.post(`https://user-management-google-auth-be.onrender.com/users/signup`, signupData)
                        sessionStorage.setItem('userData', JSON.stringify(signupData))
                        successToast('Registration successful')
                        setTimeout(() => {
                            navigate('/profile-details')
                        }, 3500);
                    }
                    catch (error) {
                        console.log(error)
                        errorToast()
                    }
                }
            }
            else {
                errorToast()
            }
        }
    }

    const err = (error) => {
        console.log(error)
        errorToast()
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

    function successToast(msg) {
        toast.success(msg, {
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
            <div className='position-absolute top-50 start-50 translate-middle border border-dark p-3 rounded' style={{}}>
                <div className='my-2'>
                    <GoogleLogin onSuccess={res} onError={err} />
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <button className="btn btn-outline-primary " type="submit" onClick={() => navigate('/admin-login')}>
                        Log In as Admin
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login