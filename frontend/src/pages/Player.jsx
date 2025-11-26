import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import video from '../assets/idleKadai.mp4';
import { useNavigate } from 'react-router-dom';

const Player = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={video} autoPlay loop controls muted></video>
      </div>
    </Container>
  );
};

export default Player;

const Container = styled.div`
  .player {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .back {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 2;

      svg {
        font-size: 2.5rem;
        color: white;
        cursor: pointer;
        transition: transform 0.3s ease, color 0.3s ease;

        &:hover {
          transform: scale(1.1);
          color: #e50914; /* Netflix red hover */
        }
      }
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
`;
