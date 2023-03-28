import React from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function EditProfile() {
  const navigate = useNavigate()
  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  // console.log(userDetails);

  function nameValidate() {
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
    const ageInput = document.getElementById('ageInput')
    const ageInputError = document.getElementById('ageInputError')

    if (ageInput.value === '') {
      ageInputError.innerText = '*Please enter age'
    }
    else if (ageInput.value <= 0 || ageInput.value.length > 3) {
      ageInputError.innerText = '*Please enter a valid age'
    }
    else if (isNaN(ageInput.value)) {
      ageInputError.innerText = '*Please use only numbers'
    }
    else {
      ageInputError.innerText = ''
    }
  }

  function updateClick() {
    // console.log('updateClick invoked');

    const userName = document.getElementById('userName')
    const userNameError = document.getElementById('userNameError')
    const ageInput = document.getElementById('ageInput')
    const ageInputError = document.getElementById('ageInputError')

    if (userName.value === '') {
      userNameError.innerText = '*Please enter name'
    }
    else {
      if (!isNaN(userName.value)) {
        userNameError.innerText = '*Please use only characters'
      }
      else {
        userNameError.innerText = ''
      }
    }
    if (ageInput.value === '') {
      ageInputError.innerText = '*Please enter age'
    }
    else {
      if (isNaN(ageInput.value)) {
        ageInputError.innerText = '*Please use only numbers'
      }
      else {
        ageInputError.innerText = ''
      }
    }
    if (userNameError.innerText === '' && ageInputError.innerText === '') {
      const userUpdatedData = {
        name: document.getElementById('userName').value,
        age: document.getElementById('ageInput').value,
        address: document.getElementById('userAddress').value,
        socialMediaHandle: document.getElementById('userSocial').value,
      }
      fetch(`https://react-google-login-be.onrender.com/updateUser/${userDetails[0].email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userUpdatedData),
      })
        .then((response) => console.log(response))
        .then((data) => {
          console.log('Success : ', userUpdatedData);

          fetch('https://react-google-login-be.onrender.com')
            .then((res) => res.json())
            .then((resData) => {
              let userD = resData.filter((elem) => elem.email === userDetails[0].email)
              // console.log(userD);
              localStorage.removeItem('userDetails')
              localStorage.setItem('userDetails', JSON.stringify(userD))
              alert('Profile Updated Successfully')
              navigate('/user-details')
            })
        })
        .catch((error) => {
          console.error('Error : ', error)
        })
    }
  }
  return (
    <>
      <Helmet>
        <title>User Management | Edit Profile</title>
      </Helmet>
      <div className='container'>
        <div >
          <div className='d-flex justify-content-center '>
            <Form>
              <div className='my-3 border border-2 rounded-3 border-dark'>
                <div className=" mt-2 mx-4 d-flex flex-column justify-content-center ">
                  <div className="d-flex justify-content-center w-100">
                    <img src={userDetails[0].picture} alt="avatar"
                      className="my-4 rounded-circle" style={{ width: '150px' }} />
                  </div>
                  <div>
                    <div className="row">
                      <div className="">
                        <p className="my-2">Full Name</p>
                      </div>
                      <div className="">
                        <Form.Control id='userName' type="text" defaultValue={userDetails[0].name} onKeyUp={() => { nameValidate() }} autoComplete='off' />
                        <span id='userNameError' style={{ color: 'red' }}></span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="">
                        <p className="my-2">Email</p>
                      </div>
                      <div className="">
                        <Form.Control id='userEmail' type="text" defaultValue={userDetails[0].email} readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="">
                        <p className="my-2">Age</p>
                      </div>
                      <div className="">
                        <Form.Control id='ageInput' type="text" defaultValue={userDetails[0].age} onKeyUp={() => { ageValidate() }} autoComplete='off' />
                        <span id='ageInputError' style={{ color: 'red' }}></span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="">
                        <p className="my-2">Address</p>
                      </div>
                      <div className="">
                        <Form.Control id='userAddress' type="text" defaultValue={userDetails[0].address} autoComplete='off' />
                      </div>
                    </div>
                    <div className="row">
                      <div className="">
                        <p className="my-2">Social Media Handle</p>
                      </div>
                      <div className="">
                        <Form.Control id='userSocial' type="text" defaultValue={userDetails[0].socialMediaHandle} autoComplete='off' />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center w-100">
                    <button className="btn btn-outline-primary my-3 w-25 px-0 " type="button" onClick={() => updateClick()}>
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
  )
}

export default EditProfile