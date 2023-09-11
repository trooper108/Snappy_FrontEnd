import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'



export default function ChatInput({handleSendMsg}) {
  const [showEmojiPicker,setShowEmojiPicker] = useState(false);
  const [msg,setMsg] = useState("");

  const handleEmojiPickerHideShow = ()=>{
    setShowEmojiPicker(!showEmojiPicker);
  }

 const sendChat = (event)=>{
  event.preventDefault();
  if(msg.length > 0){
    handleSendMsg(msg);
    setMsg("");
    setShowEmojiPicker(false);
  }
 }

  return (
    <React.Fragment>
      <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                  showEmojiPicker && <Picker width={"290px"} height={"280px"} onEmojiClick={(emoji)=>{setMsg((prevMsg)=>prevMsg+emoji.emoji)}}/>
                }
            </div>
        </div>
        <form className='input-container' onSubmit={sendChat}>
            <input type="text" placeholder='type your message here' onChange={(e)=>setMsg(e.target.value)} value={msg} />
            <button className='submit' type="submit">
                <IoMdSend/>
            </button>
        </form>
      </Container>
    </React.Fragment>
  )
}
const Container = styled.div`
  display:grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
     padding: 0 1rem;
     gap: 1rem;
    }
  .button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji{
      position: relative;
      svg{
        color: #ffff00c8;
        font-size: 1.5rem;
        cursor: pointer;
      }
      .EmojiPickerReact {
        width: px;
        position: absolute;
        top: -310px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .epr-body::-webkit-scrollbar{
            background-color: #080420;
            width: 0.2rem;
            &-thumb{
              background-color: #9186f3 ;
            } 
        }
        .epr-category-nav{
          button{
            filter: contrast(0);
          }
        }
        .epr-search{
          background-color: transparent;
          border-color: #9186f3;
        }
        .epr-emoji-category-label{
          background-color: #080420;
        }
        .epr-preview{
          display: none;
        }
      }
    }
  }
  .input-container{
    width: 100%;
    /* height: 100%; */
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input{
       width: 90%;
       /* height: 100%; */
       background-color: transparent;
       color: white;
       border: none;
       padding-left: 1rem;
       font-size: 1.2rem;
       &::selection{
        background-color: #9196f3;
       }
       &:focus{
        outline: none;
       }
    }
    button{
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: felx;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding:0.3rem 1rem;
      svg{
        font-size: 1rem;
      }
    }
      svg{
        font-size: 2rem;
        color: white;
      }
    }

  }
`;
