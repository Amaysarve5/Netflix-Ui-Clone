import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import BackgroundImage from '../assets/background.jpg';
import MovieLogo from '../assets/movielogo.png';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Slider from '../components/Slider';

const Netflix = () => {

  const navigate = useNavigate();
  const [isScrolled, setScrolled] = useState(false);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);   // FIX ADDED

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);   // (optional fix but recommended)

  window.onscroll = () => {
    setScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div>
        <Navbar isScrolled={isScrolled} />
        <div className="hero">
          <img src={BackgroundImage} alt="background" className='background-image' />
          <div className="container">
            <div className="logo">
              <img src={MovieLogo} alt="movielogo" />
            </div>
            <div className='buttons flex'>
              <button className='flex j-centre a-center bg-white text-black' onClick={() => navigate('/player')}>
                <FaPlay /> Play
              </button>
              <button className='flex j-center a-center'>
                <AiOutlineInfoCircle /> More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      <Slider movies={movies} />
    </Container>
  );
}

export default Netflix;

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;

    .background-image {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      filter: brightness(50%);
    }


    .container {
      position: absolute;
      bottom: 5rem;
    }

    .logo {
      img {
        width: 50%;
        height: 50%;
        margin-left: 5rem;
      }
    }

    .buttons {
      margin: 5rem;
      gap: 2rem;

      button {
        font-size: 1.4rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.5rem 2.4rem;
        border: none;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          opacity: 0.8;
        }

        &:nth-of-type(2) {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
        }

        svg {
          font-size: 1.8rem;
        }
      }
    }
  }

  /* Responsive for Tablet (769px to 1024px) */
  @media (max-width: 1024px) {
    .hero {
      .background-image {
        height: 80vh;
      }
      .container {
        bottom: 3rem;
      }
      .logo img {
        width: 60%;
        margin-left: 3rem;
      }
      .buttons {
        margin: 3rem;
        gap: 1.5rem;
        button {
          font-size: 1.2rem;
          padding: 0.4rem 2rem;
          svg {
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  /* Responsive for Mobile (481px to 768px) */
  @media (max-width: 768px) {
    .hero {
      .background-image {
        height: 70vh;
      }
      .container {
        bottom: 2rem;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .logo img {
        width: 80%;
        height: auto;
        margin-left: 0;
        max-width: 300px;
      }
      .buttons {
        margin: 2rem 1rem;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        button {
          font-size: 1rem;
          padding: 0.35rem 1.2rem;
          svg {
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  /* Responsive for Small Mobile (below 480px) */
  @media (max-width: 480px) {
    .hero {
      .background-image {
        height: 60vh;
      }
      .container {
        bottom: 1.5rem;
      }
      .logo img {
        width: 90%;
        max-width: 250px;
      }
      .buttons {
        margin: 1.5rem 0.75rem;
        gap: 0.75rem;
        button {
          font-size: 0.9rem;
          padding: 0.3rem 1rem;
          svg {
            font-size: 1rem;
          }
        }
      }
    }
  }

  /* Responsive for Extra Small Mobile (below 370px) */
  @media (max-width: 370px) {
    .hero {
      .background-image {
        height: 50vh;
      }
      .container {
        bottom: 1rem;
      }
      .logo img {
        width: 100%;
        max-width: 200px;
      }
      .buttons {
        margin: 1rem 0.5rem;
        gap: 0.5rem;
        button {
          font-size: 0.8rem;
          padding: 0.25rem 0.8rem;
          svg {
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  
`;


