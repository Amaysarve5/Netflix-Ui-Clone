import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center items-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu>
          <ul className="mobile-links flex column">
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
        </MobileMenu>
      )}
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }

  /* Responsive for Laptop (1025px and above) */
  @media (max-width: 1024px) {
    nav {
      padding: 0 2rem;
      height: 6rem;
      .left {
        gap: 1.5rem;
        .brand img {
          height: 3.5rem;
        }
        .links {
          gap: 1.5rem;
          li a {
            font-size: 0.95rem;
          }
        }
      }
      .right {
        gap: 0.8rem;
        svg {
          font-size: 1rem;
        }
      }
    }
  }

  /* Responsive for Tablet (769px to 1024px) */
  @media (max-width: 768px) {
    nav {
      padding: 0 1.5rem;
      height: 5.5rem;
      .left {
        gap: 0.8rem;
        .brand img {
          height: 3rem;
        }
        .links {
          gap: 1rem;
          li a {
            font-size: 0.85rem;
          }
        }
      }
      .right {
        gap: 0.6rem;
        button svg {
          font-size: 1rem;
        }
      }
    }
  }

  /* Responsive for Mobile (below 768px) */
  @media (max-width: 480px) {
    nav {
      padding: 0 0.75rem;
      height: 4.5rem;
      .left {
        gap: 0.5rem;
        .brand img {
          height: 2.5rem;
        }
        .links {
          display: none;
        }
      }
      .right {
        gap: 0.4rem;
        button svg {
          font-size: 0.9rem;
        }
      }
    }
  }

  /* Responsive for Small Mobile (below 370px) */
  @media (max-width: 370px) {
    nav {
      padding: 0 0.5rem;
      height: 4rem;
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

  /* Hide hamburger on larger screens */
  .hamburger {
    display: none;
  }

  @media (max-width: 480px) {
    .hamburger {
      display: block;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        svg {
          color: white;
          font-size: 1.2rem;
        }
      }
    }
  }
  
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 0;
  z-index: 1;
  
  .mobile-links {
    list-style-type: none;
    padding: 0 1rem;
    
    li {
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      a {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        display: block;
        padding: 0.5rem 0;
        
        &:hover {
          color: #e50914;
        }
      }
    }
  }

  @media (max-width: 480px) {
    display: flex;
  }
`;
