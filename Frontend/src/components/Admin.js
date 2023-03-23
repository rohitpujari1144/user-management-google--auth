import React from "react";
import { Helmet } from "react-helmet";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Admin() {
  const users = JSON.parse(localStorage.getItem('userinfo'))
  let navigate = useNavigate();

  fetch("https://react-google-login-be.onrender.com/")
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      localStorage.setItem("userinfo", JSON.stringify(data))
    });

  const userD = Object.values(users || {})
  const len = userD.length;
  console.log(len);
  console.table(userD)

  // function windowReload() {
  //   const reloadCount = sessionStorage.getItem('reloadCount');
  //   if (reloadCount < 2) {
  //     sessionStorage.setItem('reloadCount', String(reloadCount + 1));
  //     window.location.reload();
  //   }
  //   else {
  //     sessionStorage.removeItem('reloadCount');
  //   }
  // }

  async function deleteNewUserData(i) {
    console.log('deleted')
    let data = await fetch(`https://react-google-login-be.onrender.com/deleteUser/${userD[i].email}`, {
      method: "Delete",
      headers: { "content-Type": "application/json" },
    });
    let res = await data.json();
    console.log(res);
    navigate('/admin')

    // windowReload()
  }

  function logoutAsAdmin() {
    localStorage.clear()
    navigate('/signin')
  }

  return (
    <>
      <Helmet>
        <title>User Management | Admin</title>
      </Helmet>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid">
            <div className="d-sm-flex justify-content-between mb-4">
              <h1 className="m-2 h3 text-gray-800" style={{ color: 'blue' }}>Welcome to Admin Dashboard !</h1>
              <div className="row">
                <div className="d-flex justify-content-between my-4">
                  <div className="d-flex justify-content-end" id="signindiv">
                    <button className="btn btn-outline-warning fw-bold " type="submit" onClick={() => logoutAsAdmin()}>
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Social Media Handle</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    userD.map((e, i) => {
                      return <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.age}</td>
                        <td>{e.address}</td>
                        <td>{e.socialMediaHandle}</td>
                        <td>
                          <button className="btn btn-outline-danger" onClick={() => deleteNewUserData(i)}>Delete</button>
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;