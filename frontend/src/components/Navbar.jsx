import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/fire-base-config";
import { FaPowerOff, FaSearch, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser)=> {
          if(!currentUser) navigate("/login");
      })

  return (
    <Container $isScrolled={isScrolled}>
      <nav className={isScrolled ? "scrolled" : ""}>
        <div className="left">
          <div className="brand">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
          <div className="hamburger">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && <MobileMenu>
        <ul className="mobile-links">
          {links.map(({ name, link }) => {
            return (
              <li key={name}>
                <Link to={link} onClick={() => setMobileMenuOpen(false)}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </MobileMenu>}
    </Container>
  );
}

const Container = styled.div`
position: fixed;
top: 0;
z-index: 10;
width: 100%;
nav{
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  &.scrolled{
    background-color: black;
  }
  .left{
    display: flex;
    gap: 2rem;
    align-items: center;
    .brand{
      img{
        height: 4rem;
      }
    }
    .links{
      list-style: none;
      display: flex;
      gap: 2rem;
      li{
        a{
          color: white;
          text-decoration: none;
          &:hover{
            color: #b20710;
          }
        }
      }
    }
  }
  .right{
    display: flex;
    gap: 1rem;
    align-items: center;
    button{
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: white;
      svg{
        color: #b20710;
        font-size: 1.2rem;
      }
    }
    .search{
      display: flex;
      gap: 0.5rem;
      align-items: center;
      button{
        svg{
          color: white;
        }
      }
      input{
        width: 0;
        border: none;
        background-color: transparent;
        outline: none;
        color: white;
        &::placeholder{
          color: white;
        }
      }
      &.show-search{
        border: 1px solid #414141;
        background-color: rgba(0, 0, 0, 0.6);
        padding: 0.3rem;
        padding-left: 0.8rem;
        border-radius: 0.2rem;
        input{
          width: 100%;
          padding: 0 0.3rem;
        }
      }
    }
    .hamburger{
      display: none;
    }
  }
}

@media (max-width: 1024px) {
  nav {
    padding: 0 2rem;
    .left {
      gap: 1rem;
      .brand img {
        height: 3.5rem;
      }
    }
    .right {
      gap: 0.8rem;
    }
  }
}

@media (max-width: 768px) {
  nav {
    height: 5rem;
    padding: 0 1.5rem;
    .left {
      gap: 0.8rem;
      .brand img {
        height: 3rem;
      }
      .links {
        display: none;
      }
    }
    .right {
      gap: 0.6rem;
      .hamburger {
        display: block;
      }
    }
  }
}

@media (max-width: 480px) {
  nav {
    height: 4rem;
    padding: 0 1rem;
    .left {
      gap: 0.5rem;
      .brand img {
        height: 2.5rem;
      }
    }
  }
}

@media (max-width: 370px) {
  nav {
    height: 3.5rem;
    padding: 0 0.5rem;
    .left {
      gap: 0.3rem;
      .brand img {
        height: 2rem;
      }
    }
    .right {
      gap: 0.3rem;
    }
  }
}
`;

const MobileMenu = styled.div`
position: fixed;
top: 5rem;
left: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.5);
padding: 1rem;
z-index: 10;
.mobile-links{
  list-style: none;
  padding: 1rem;
  li{
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.75rem 0;
    a{
      color: white;
      text-decoration: none;
      display: block;
      padding: 0.5rem 0;
      &:hover{
        color: #b20710;
      }
    }
  }
}

@media (max-width: 480px) {
  top: 4rem;
}

@media (max-width: 370px) {
  top: 3.5rem;
}
`;

