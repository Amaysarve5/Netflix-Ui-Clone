import React from 'react'
import styled from 'styled-components'
import backgroundImage from "../assets/BackgroundImage.jpg"

const BackgroundImage = () => {
  return (
    <Container>
      <img src={backgroundImage} alt="background" />
    </Container>
  )
}

export default BackgroundImage

const Container = styled.div`
height: 100vh;
width: 100vw;
position: absolute;
top: 0;
left: 0;
img{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
`;


