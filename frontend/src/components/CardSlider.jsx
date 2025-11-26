import React, { useRef, useState } from 'react'
import Card from './Card'
import styled from 'styled-components'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const CardSlider = ({ data, title }) => {

  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    const slider = listRef.current;

    if (!slider) return;

    let distance = sliderPosition;

    if (direction === "left" && sliderPosition > 0) {
      distance -= 230; 
      setSliderPosition(distance);
      slider.style.transform = `translateX(-${distance}px)`;
    }

    if (direction === "right" && slider.scrollWidth - sliderPosition > 230 * 5) {
      distance += 230;
      setSliderPosition(distance);
      slider.style.transform = `translateX(-${distance}px)`;
    }
  };

  return (
    <Container className='flex column'
     onMouseEnter={() => setShowControls(true)}
     onMouseLeave={() => setShowControls(false)}
    >
      <h1 className='font-bold text-2xl'>{title}</h1>

      <div className='wrapper'>
        <div className={`slider-action left ${!showControls ? "none" : ""} flex j-center a-center`}>
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>

        <div className='flex slider' ref={listRef}>
          {data.map((movie, index) => (
            <Card movieData={movie} index={index} key={movie.id} />
          ))}
        </div>

        <div className={`slider-action right ${!showControls ? "none" : ""} flex j-center a-center`}>
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    
    </Container>
  );
};

export default CardSlider;


const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;

  h1 {
    margin-left: 50px;
  }

  .wrapper {
    position: relative;

    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }

    .slider-action {
      position: absolute;
      z-index: 99;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 50px;
      transition: 0.3s ease-in-out;
      cursor: pointer;

      svg {
        font-size: 2rem;
      }
    }

    .left {
      left: 0;
    }

    .right {
      right: 0;
    }

    .none {
      display: none;
    }
      .left{
        left: 0;
      }
        .right{
          right: 0;
        }
  }

  
`;
