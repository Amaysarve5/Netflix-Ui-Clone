import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/fire-base-config';
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

const Movies = () => {
  const navigate = useNavigate();
  const [isScrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);


  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset !== 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fix: Redirect ONLY when user is NOT logged in
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled}/>
      <div className="data">
        <SelectGenre genres={genres} type="movie"/>
        {movies.length ? <Slider movies={movies}/> : <NotAvailable />}
      </div>
    </Container>
  )
}

export default Movies

const Container = styled.div`
background-color: black;
.data{
  margin-top: 8rem;
  .not-available{
    text-align: center;
    color: white;
    margin-top: 4rem;
  }
}
`;


