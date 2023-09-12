import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';


export default function Register() {

    const navigate = useNavigate();

    useEffect(()=>{
        if(window.localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    },[navigate])

    const [values,setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    });

    const toastOption = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }
  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(handleValidation()){
        const {username,email,password} = values;
        const {data} = await axios.post(registerRoute,{username,password,email});
        // console.log(data);  
        if(data.status === false){
            toast.error(data.msg,toastOption);
        }
        if(data.status === true){
            window.localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate('/setAvatar');
        }
    }
  }
  const handleValidation = ()=>{
    const {username,email,password,confirmPassword} = values
    if(password !== confirmPassword){
        toast.error('Password and Confirm Password should be same.',toastOption);
        return false;
    }
    else if(username.length < 3){
        toast.error('Username should be greater than 3 characters.',toastOption);
        return false;
    }else if(password.length < 8){
        toast.error('Password should be equal or greater than 8 characters.',toastOption);
        return false;
    }
    else if(email === ''){
        toast.error('Email is required',toastOption);
        return false;
    }
    return true;
  }
  const handleChange = (event)=>{ 
    setValues({...values,[event.target.name]:event.target.value})
  }
  return (
    <React.Fragment>
      <FormContainer>
        <form onSubmit={handleSubmit}>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1>snappy</h1>
            </div>
            <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
            <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
            <input type="Password" placeholder='Password' name='password' onChange={handleChange}/>
            <input type="Password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange}/>

            <button type='submit'>Create User</button>
            <span>Already have an account ? <Link to={'/login'}>Login</Link></span>

        </form>
        <ToastContainer/>
      </FormContainer>
    </React.Fragment>
  )
}


const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            height: 5rem;
        }
        h1{
            color: white;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width:100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button{
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #4e0eff;
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-transform: none;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;
