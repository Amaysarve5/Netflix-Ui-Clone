import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres, getUserLikedMovies } from '../store';
import { firebaseAuth } from '../utils/fire-base-config';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import Card from '../components/Card';


const UserLiked = () => {

    const navigate = useNavigate();
  const [isScrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.netflix.movies);

  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
      });


  useEffect(() => {
    if(email){
        dispatch(getUserLikedMovies(email))
    }
  }, [email]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset !== 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <Container>
        <Navbar isScrolled={isScrolled}/>
        <div className="content flex column">
            <h1>My list</h1>
            <div className='grid flex'>
                {movies.map((movie, index)=>{
                    return <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>
                })}
            </div>
        </div>
    </Container>
  )
}

export default UserLiked

const Container = styled.div`
    .content{
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1{
      margin-left: 3rem;
    }
      .grid{
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
    
`;