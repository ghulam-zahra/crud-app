import React, {useEffect, useState} from "react";
import "../adduser/add.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";


const Edit = () => {
    const users = {
        fname:"",
        lname:"",
        email:"",
    }


    const {id} = useParams();
    const navigate = useNavigate()
    const [user,setUser]= useState(users);

    const inputChangeHandler = (e) =>{
        const {name,value} = e.target;
        setUser({...user , [name]:value})
    }
    useEffect(()=>{
        axios.get(`https://crud-app-xee.bonto.run/user/getbyid/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error) =>{
            console.log(error);
            
        })
    },[id])

    const submitForm = async(e)=>{
          e.preventDefault();
        await axios.put(`https://crud-app-xee.bonto.run/user/updatebyid/${id}` ,user)
        .then((response) =>{
            toast.success(response.data.msg,{position:"top-right"})
            navigate("/")
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update user",{position:"top-right"})
        });
    }

  return (
     <div className='addUser'>
                <Link to={"/"} className='backButton'>Back</Link>
                <h3>Update user</h3>
                <form className='addUserForm' onSubmit={submitForm}> 
                    <div className='inputGroup'>
                        <label htmlFor='fname'>FirstName:</label>
                        <input type='text' value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' autoComplete='off' placeholder='Enter first name' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='lname'>LastName:</label>
                        <input type='text' value={user.lname} onChange={inputChangeHandler}  id='lname' name='lname' autoComplete='off' placeholder='Enter last name' />
                    </div>
                    <div className='inputGroup'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' value={user.email} onChange={inputChangeHandler}  id='email' name='email' autoComplete='off' placeholder='Enter email' />
                    </div>
                    <div className='inputGroup'>
                        <button type='submit'>Update User</button>
                    </div>
                </form>
    
    
            </div>
    )

 }

 export default Edit;