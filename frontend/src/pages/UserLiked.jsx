import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres, getUserLikedMovies } from '../store';
import { firebaseAuth } from '../utils/fire-base-config';
import Navbar from '../components/Navbar';
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
        <div className="content">
            <h1>My list</h1>
            <div className='cards'>
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
background-color: black;
.content{
  margin: 2rem;
  margin-top: 8rem;
  h1{
    color: white;
    margin-left: 3rem;
    font-size: 2.5rem;
  }
  .cards{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 3rem;
  }
}
`;

