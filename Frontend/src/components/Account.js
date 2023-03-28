import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function Account() {
    let navigate = useNavigate()
    const userD = JSON.parse(localStorage.getItem('userDetails'))

    function submitToHome() {
        const userName = document.getElementById('userName')
        const ageInput = document.getElementById('ageInput')
        const userAddress = document.getElementById('userAddress')
        const userSocial = document.getElementById('userSocial')

        const userNameError = document.getElementById('userNameError')
        const ageInputError = document.getElementById('ageInputError')
        const userAddressError = document.getElementById('userAddressError')
        const userSocialError = document.getElementById('userSocialError')

        if (userName.value === '') {
            userNameError.innerText = '*Please enter name'
        }
        else {
            userNameError.innerText = ''
        }
        if (ageInput.value === '') {
            ageInputError.innerText = '*Please enter age'
        }
        else {
            ageInputError.innerText = ''
        }
        if (userAddress.value === '') {
            userAddressError.innerText = '*Please enter address'
        }
        else {
            userAddressError.innerText = ''
        }
        if (userSocial.value === '') {
            userSocialError.innerText = '*Please enter social media link'
        }
        else {
            userSocialError.innerText = ''
        }
        if (userNameError.innerText === '' && ageInputError.innerText === '' && userAddressError.innerText === '' && userSocialError.innerText === '') {
            alert('Profile Updated Successfully')
            navigate(`/user-details`)
            const userData = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                age: document.getElementById('ageInput').value,
                address: document.getElementById('userAddress').value,
                socialMediaHandle: document.getElementById('userSocial').value,
            }
            // console.log(userData);
            fetch(`https://react-google-login-be.onrender.com/updateUser/${userD.email}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
                .then((response) => console.log(response))
                .then((data) => {
                    console.log('Success : ', userData);
                })
                .catch((error) => {
                    console.error('Error : ', error)
                })
        }
    }

    function nameValidate() {
        // console.log('nameValidate invoked');
        const userName = document.getElementById('userName')
        const userNameError = document.getElementById('userNameError')

        if (userName.value === '') {
            userNameError.innerText = '*Please enter name'
        }
        else if (!isNaN(userName.value)) {
            userNameError.innerText = '*Please use only characters'
        }
        else {
            userNameError.innerText = ''
        }
    }

    function ageValidate() {
        // console.log('ageValidate invoked');
        const ageInput = document.getElementById('ageInput')
        const ageInputError = document.getElementById('ageInputError')

        if (ageInput.value === '') {
            ageInputError.innerText = '*Please enter age'
        }
        else if (isNaN(ageInput.value)) {
            ageInputError.innerText = '*Please use only numbers'
        }
        else if (ageInput.value.length > 3) {
            ageInputError.innerText = '*Please enter a valid age'
        }
        else {
            ageInputError.innerText = ''
        }
    }

    function addressValidate() {
        // console.log('addressValidate invoked');
        const userAddress = document.getElementById('userAddress')
        const userAddressError = document.getElementById('userAddressError')


        if (userAddress.value === '') {
            userAddressError.innerText = '*Please enter address'
        }
        else if (userAddress.value.length < 3) {
            userAddressError.innerText = '*Please enter detailed address'
        }
        else {
            userAddressError.innerText = ''
        }
    }

    function userSocialValidate() {
        // console.log('userSocialValidate invoked');
        const userSocial = document.getElementById('userSocial')
        const userSocialError = document.getElementById('userSocialError')

        if (userSocial.value === '') {
            userSocialError.innerText = '*Please enter social address link'
        }
        else {
            userSocialError.innerText = ''
        }
    }

    return <>
        <div className='container'>
            <div >
                <div className='d-flex justify-content-center '>
                    <Form>
                        <div className='my-3 border border-2 rounded-3 border-dark'>
                            <div className=" mt-2 mx-4 d-flex flex-column justify-content-center ">
                                <div className="d-flex justify-content-center w-100">
                                    <img src={userD.picture} alt="avatar"
                                        className="my-4 rounded-circle" style={{ width: '150px' }} />
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="">
                                            <p className="my-2">Full Name</p>
                                        </div>
                                        <div className="">
                                            <Form.Control id='userName' type="text" defaultValue={userD.name} onKeyUp={() => { nameValidate() }} autoComplete='off' />
                                            <span id='userNameError' style={{ color: 'red' }}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="">
                                            <p className="my-2">Email</p>
                                        </div>
                                        <div className="">
                                            <Form.Control id='userEmail' type="text" defaultValue={userD.email} readOnly />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="">
                                            <p className="my-2">Age</p>
                                        </div>
                                        <div className="">
                                            <Form.Control id='ageInput' type="text" defaultValue={userD.age} onKeyUp={() => { ageValidate() }} autoComplete='off' />
                                            <span id='ageInputError' style={{ color: 'red' }}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="">
                                            <p className="my-2">Address</p>
                                        </div>
                                        <div className="">
                                            <Form.Control id='userAddress' type="text" defaultValue={userD.address} onKeyUp={() => { addressValidate() }} autoComplete='off' />
                                            <span id='userAddressError' style={{ color: 'red' }}></span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="">
                                            <p className="my-2">Social Media Handle</p>
                                        </div>
                                        <div className="">
                                            <Form.Control id='userSocial' type="text" defaultValue={userD.socialMediaHandle} onKeyUp={() => { userSocialValidate() }} autoComplete='off' />
                                            <span id='userSocialError' style={{ color: 'red' }}></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center w-100">
                                    <button className="btn btn-outline-primary my-3 w-25 px-0 " type="submit" onClick={() => submitToHome()}>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>
}

export default Account