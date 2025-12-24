import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import video from "../assets/TrainDream.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/fire-base-config";
import { removeFromLikedMovies } from "../store";
import { useDispatch } from "react-redux";

const Card = ({ movieData, isLiked = false }) => {
  const [email, setEmail] = useState(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) setEmail(currentUser.email);
      else navigate("/login");
    });
  }, [navigate]);

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
      console.log("Added");
    } catch (err) {
      console.log("Error adding:", err);
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData?.image}`}
        alt="movies"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData?.image}`}
              alt="movies"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="info-container">
            <h3 onClick={() => navigate("/player")}>{movieData?.name}</h3>
            <div className="icons">
              <IoPlayCircleSharp
                title="Play"
                onClick={() => navigate("/player")}
              />
              <RiThumbUpFill title="Like" />
              <RiThumbDownFill title="Dislike" />
              {isLiked ? (
                <BsCheck
                  title="Remove from List"
                  onClick={() =>
                    dispatch(removeFromLikedMovies({ movieId: movieData.id, email }))
                  }
                />
              ) : (
                <AiOutlinePlus title="Add to My List" onClick={addToList} />
              )}
            </div>
            <div className="info">
              <BiChevronDown title="More Info" />
            </div>
          </div>
          <div className="genres">
            <ul>
              {movieData?.genres?.map((genre, idx) => (
                <li key={idx}>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Card;

const Container = styled.div`
  max-width: 15rem;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.25rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18rem;
    left: 0;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 7px 29px 0px;
    background-color: #181818;
    .image-video-container {
      position: relative;
      height: 9rem;
      img {
        width: 100%;
        height: 9rem;
        object-fit: cover;
        border-radius: 0.25rem 0.25rem 0 0;
      }
      video {
        width: 100%;
        height: 9rem;
        object-fit: cover;
        border-radius: 0.25rem 0.25rem 0 0;
        position: absolute;
        top: 0;
        z-index: 69;
      }
    }
    .info-container {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h3 {
        color: white;
        margin: 0.5rem 0;
      }
      .icons {
        display: flex;
        gap: 1rem;
        svg {
          font-size: 1.5rem;
          cursor: pointer;
          transition: 0.3s;
          color: #f5f5f1;
          &:hover {
            color: #b20710;
          }
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          cursor: pointer;
        }
      }
    }
    .genres {
      display: flex;
      padding: 1rem;
      ul {
        display: flex;
        gap: 1rem;
        list-style: none;
      }
      li {
        color: #f5f5f1;
        font-size: 0.75rem;
      }
    }
  }
`;

