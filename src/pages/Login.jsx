import React, { useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes';



export default function Login() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.localStorage.getItem('chat-app-user')){
            navigate('/')
        }
    },[navigate])

    const [values,setValues] = useState({
        username:'',
        password:'',
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
        const {username,password} = values;
        const {data} = await axios.post(loginRoute,{username,password});
        // console.log(data);  
        if(data.status === false){
            toast.error(data.msg,toastOption);
        }
        if(data.status === true){
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate('/setAvatar');
        }
    }
  }
  const handleValidation = ()=>{
    const {username,password} = values
    if(password ===""){
        toast.error('Password is required.',toastOption);
        return false;
    }
    else if(username.length ===""){
        toast.error('UserName is required',toastOption);
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
            <input type="text" placeholder='Username' name='username' min='3' onChange={handleChange}/>
            <input type="Password" placeholder='Password' name='password' onChange={handleChange}/>
            <button type='submit'>Login</button>
            <span>Don't have an account ? <Link to={'/register'}>Register</Link></span>

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
