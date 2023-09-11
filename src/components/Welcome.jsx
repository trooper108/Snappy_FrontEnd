import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
export default function Welcome({currentUser}) {
  return (
    <React.Fragment>
      <Container>
        <img src={Robot} alt="robot" />
        <h2>Welcome, <span>{currentUser.username}</span></h2>
        <h3>Please Select a chat to start Messaging</h3>
      </Container>
    </React.Fragment>
  )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 25rem;
    }
    span{
        color:#4e0eff;
        text-transform:uppercase;
    }
`;      