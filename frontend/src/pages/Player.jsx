import React from 'react'
import styled from 'styled-components'
import { BsArrowLeft } from 'react-icons/bs'
import video from '../assets/idleKadai.mp4'
import { useNavigate } from 'react-router-dom'

const Player = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="back" onClick={() => navigate(-1)}>
          <BsArrowLeft />
        </div>
        <video src={video} autoPlay controls loop muted></video>
      </div>
    </Container>
  );
};

export default Player

const Container = styled.div`
.player{
    height: 100vh;
    width: 100vw;
    .back{
        position: absolute;
        padding: 2rem;
        z-index: 1;
        color: white;
        cursor: pointer;
        font-size: 1.5rem;
        &:hover{
            color: #b20710;
        }
    }
    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
`;
