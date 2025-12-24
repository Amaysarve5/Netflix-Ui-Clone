import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Card from './Card'
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
    <Container
     onMouseEnter={() => setShowControls(true)}
     onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>

      <div className='wrapper'>
        <div className={`slider-action left ${!showControls ? "none" : ""}`}>
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>

        <div className='slider' ref={listRef}>
          {data.map((movie, index) => (
            <Card movieData={movie} index={index} key={movie.id} />
          ))}
        </div>

        <div className={`slider-action right ${!showControls ? "none" : ""}`}>
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    
    </Container>
  );
};

export default CardSlider;

const Container = styled.div`
gap: 1rem;
display: flex;
flex-direction: column;
position: relative;
padding: 2rem;
h1{
  margin-left: 3rem;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}
.wrapper{
  position: relative;
  display: flex;
  .slider-action{
    position: absolute;
    z-index: 99;
    height: 100%;
    top: 0;
    bottom: 0;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.none{
      display: none;
    }
    svg{
      color: white;
      font-size: 2rem;
    }
  }
  .slider-action.left{
    left: 0;
  }
  .slider-action.right{
    right: 0;
  }
  .slider{
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    transform: translateX(0px);
    transition: 0.3s ease-in-out;
    margin-left: 3rem;
    &::-webkit-scrollbar{
      display: none;
    }
  }
}
@media (max-width: 1024px) {
  padding: 1.5rem;
  h1{
    margin-left: 2.5rem;
    font-size: 1.1rem;
  }
  .wrapper{
    .slider-action{
      width: 2.5rem;
      svg{
        font-size: 1.5rem;
      }
    }
    .slider{
      margin-left: 2.5rem;
    }
  }
}

@media (max-width: 768px) {
  padding: 1rem;
  h1{
    margin-left: 2rem;
    font-size: 1rem;
  }
  .wrapper{
    .slider-action{
      width: 2rem;
      svg{
        font-size: 1.2rem;
      }
    }
    .slider{
      margin-left: 2rem;
    }
  }
}

@media (max-width: 480px) {
  padding: 0.5rem;
  h1{
    margin-left: 1.5rem;
    font-size: 0.9rem;
  }
  .wrapper{
    .slider-action{
      width: 1.5rem;
      svg{
        font-size: 1rem;
      }
    }
    .slider{
      margin-left: 1.5rem;
    }
  }
}

@media (max-width: 370px) {
  h1{
    margin-left: 1rem;
    font-size: 0.8rem;
  }
  .wrapper{
    .slider-action{
      width: 1rem;
      svg{
        font-size: 0.8rem;
      }
    }
    .slider{
      margin-left: 1rem;
    }
  }
}
`;


