import React, { useEffect, useState } from "react";
import "./user.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {

  const [users, setUser] = useState([])

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response = await axios.get("http://localhost:8000/user/getall")
        setUser(response.data)
      } catch(error){
        console.log(error);
        toast.error("Failed to load users. Is the server running?", {position: 'top-right'})
      }
    }
    fetchData();
  },[])

  const deleteUser =async (userId) =>{
    await axios.delete(`http://localhost:8000/user/deletebyid/${userId}`)
    .then((response)=>{
      setUser((prevUser)=>prevUser.filter((user)=>user._id !== userId))
      toast.success(response.data.msg, {position: 'top-right'})
      
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }
  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>User Management</h1>
          <p>{users.length} {users.length === 1 ? "user" : "users"} registered</p>
        </div>
      </div>
      <div className="userTable">
        <Link to={"/add"} className="addButton"><i className="fa-solid fa-plus"></i> Add User</Link>
        <table cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>User name</th>
              <th>User email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.length === 0
                ? (
                  <tr>
                    <td colSpan={4} className="emptyState">No users yet — add your first user to get started.</td>
                  </tr>
                )
                : users.map((user,index)=>{
                  return(
                    <tr key={user._id}>
                      <td>{index+1}</td>
                      <td>{user.fname} {user.lname}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="actionButtons">
                          <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                          <Link to={`/edit/` + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                        </div>
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
