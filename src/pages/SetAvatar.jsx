import React, { useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'
import styled from 'styled-components'
import { Buffer } from 'buffer';
import axios from 'axios';
import loader from '../assets/loader.gif'
import { setAvatarRoute } from '../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';


export default function SetAvatar() {
    const navigate = useNavigate();
    const api = 'https://api.multiavatar.com/45678945';
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);

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
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login');
        }
    
    },[navigate])
    useEffect( ()=>{
        const check = async()=>{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            if(user.isAvatarImageSet){
                navigate('/');
            }
        }
        check();
    },[navigate])
    const setProfilePicture = async()=>{
        if(selectedAvatar === undefined){
            toast.error('Please select an Avatar',toastOption)
        }
        else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedAvatar],
            })
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-app-user',JSON.stringify(user))
                navigate('/');
            }
            else{
                toast.error('Error setting avatar. Please try again',toastOption);
            }
        }
        
    }

    useEffect(()=>{
        const insert=async ()=>{    
        const data = [];
            for(let i = 0; i < 4 ;i++){
                const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        insert();
    },[])
  return (
    <React.Fragment>
        {
            isLoading?(<Container>
                <img src={loader} alt="loader" className='loader' />
            </Container>)
            :(
        <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    avatars.map(
                        (avatar,index)=>{
                           return(
                            <div key={index} className={`avatar ${selectedAvatar===index?'selected':''}`}>
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=>{setSelectedAvatar(index)}} />
                            </div>
                           )
                        })
                }
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
        )}
        <ToastContainer/>
    </React.Fragment>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #131324;
    gap: 3rem;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn{
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
`
