import React, { useState } from 'react'
import "./add.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'

const Add = () => {
    const users = {
        fname :"",
        lname:"",
        email:"",
        password:""
    } 
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const inputHandler = (e) =>{
       const {name, value } = e.target;
       setUser({...user, [name]:value})
    }

    const submitForm = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8000/user/create" ,user)
        .then(() =>{
            toast.success("User added successfully",{position:"top-right"})
            navigate("/")
        }).catch(error => {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to add user",{position:"top-right"})
        });
    }
    return (
        <div className='addUser'>
            <Link to={"/"} className='backButton'>Back</Link>
            <h3>Add new user</h3>
            <form className='addUserForm' onSubmit={submitForm}> 
                <div className='inputGroup'>
                    <label htmlFor='fname'>FirstName:</label>
                    <input type='text' onChange={inputHandler} id='fname' name='fname' autoComplete='off' placeholder='Enter first name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='lname'>LastName:</label>
                    <input type='text'  onChange={inputHandler} id='lname' name='lname' autoComplete='off' placeholder='Enter last name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' onChange={inputHandler} id='email' name='email' autoComplete='off' placeholder='Enter email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' onChange={inputHandler} id='password' name='password' autoComplete='off' placeholder='Enter password' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add User</button>
                </div>
            </form>
        </div>
    )
}
export default Add