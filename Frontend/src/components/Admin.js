import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin.css'

function Admin() {
  let navigate = useNavigate();
  let [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    getAllUsers()
  }, [])

  async function getAllUsers() {
    try {
      let res = await axios.get(`https://user-management-google-auth-be.onrender.com/users`)
      if (res.data.length) {
        setUserInfo(res.data)
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async function deleteUserClick(user) {
    try {
      await axios.delete(`https://user-management-google-auth-be.onrender.com/users/delete-user?docId=${user._id}`)
      getAllUsers()
      successToast()
    }
    catch (error) {
      errorToast()
    }
  }

  function successToast() {
    toast.success('User successfully deleted', {
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

  return (
    <>
      <div className="">
        <div className="welcomeHeading" >
          <h4 className="text-primary">Welcome to Admin Dashboard !</h4>
          <button className="logoutButton btn btn-outline-warning btn-sm" onClick={() => navigate('/login')}>Log out</button>
        </div>
        <div className="tableMainDiv border rounded">
          <table className="table" style={{ borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#a3a3a3', position: 'sticky', top: 0 }}>
              <tr>
                <th scope="col" style={{ position: 'sticky', top: 0 }}>Sr. No.</th>
                <th scope="col" style={{ position: 'sticky', top: 0 }}>Name</th>
                <th scope="col" style={{ position: 'sticky', top: 0 }}>Email Id</th>
                <th scope="col" style={{ position: 'sticky', top: 0 }}>Address</th>
                <th scope="col" style={{ position: 'sticky', top: 0 }}>Age</th>
                <th scope="col" style={{ position: 'sticky', top: 0 }}>Social media handle</th>
                <th scope="col" style={{ position: 'sticky', top: 0 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                userInfo.length ? userInfo.map((e, i) => {
                  return <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.address}</td>
                    <td>{e.age}</td>
                    <td>{e.socialMediaHandle}</td>
                    <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteUserClick(e)}>Delete</button></td>
                  </tr>
                }) : <tr><td>No user data found</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Admin;