import React from 'react'
import backgroundImage from "../assets/BackgroundImage.jpg"
import styled from 'styled-components'

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
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
