import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { allUserRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client'
export default function Chat() {

  const navigate = useNavigate();
  const socket = useRef()

  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    const getData=async()=>{
      if(!localStorage.getItem('chat-app-user')){
        navigate('/login');
      }
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    }
    getData();
  },[navigate]);

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user',currentUser._id);
    }
  },[currentUser])

  useEffect(()=>{
    const fetch=async()=>{
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const {data} = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data);
        }
        else{
          navigate('/')
        }
      }
    }
    fetch();
  },[currentUser,navigate])

  const handleChatChange=(chat)=>{
    setCurrentChat(chat);
  }

  return (
    <React.Fragment>
      <Component>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          {
            isLoaded && currentChat === undefined ?
              <Welcome currentUser={currentUser} />
              :
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          }
        </div>
      </Component>
    </React.Fragment>
  )
}

const Component = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container{
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
