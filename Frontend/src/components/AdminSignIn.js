import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSignIn() {
  let navigate = useNavigate();
  const adminpassword = "Data@123";

  function loginAsAdmin() {
    const pw = document.getElementById("adminpw");

    if (pw.value === '') {
      document.getElementById('floatingPassword').style = 'color:red'
      pw.style = 'border-color:red'
      document.getElementById('pwdError').innerText = '*Please enter password'
    }
    else {
      if (pw.value === adminpassword) {
        alert('Login Successful')
        navigate("/admin");
      }
      else {
        document.getElementById('floatingPassword').style = 'color:red'
        pw.style = 'border-color:red'
        document.getElementById('pwdError').innerText = '*Incorrect password'
      }
    }
  }

  function passwordValidate() {
    if (document.getElementById('adminpw').value === '') {
      document.getElementById('floatingPassword').style = 'color:red'
      document.getElementById('adminpw').style = 'border-color:red'
      document.getElementById('pwdError').innerText = '*Please enter password'
    }
    else {
      document.getElementById('floatingPassword').removeAttribute('style')
      document.getElementById('adminpw').removeAttribute('style')
      document.getElementById('pwdError').innerText = ''
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className=" border-0 shadow rounded-3 my-5">
              <div className=" p-4 p-sm-5">
                <h5 className=" text-center mb-3 fs-5">
                  Enter Password
                </h5>
                <div className="form-floating mb-3">
                  <input id="adminpw" type="password" className="form-control" placeholder="Password" onKeyUp={() => passwordValidate()} />
                  <label id='floatingPassword' htmlFor="floatingPassword">Password</label>
                  <span id='pwdError' style={{ color: 'red' }}></span>
                </div>
                <div className="d-grid">
                  <button className="btn btn-outline-success" type="submit" onClick={() => loginAsAdmin()}>Log In</button>
                </div>
                <p className="mt-1">Password : Data@123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSignIn;