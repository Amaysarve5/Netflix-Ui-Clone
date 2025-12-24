import React from 'react'
import styled from 'styled-components'
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    // Decide button text/target: prefer explicit prop, otherwise infer from current path
    let buttonText = props.login ? "Log In" : "Sign In";
    let target = props.login ? "/login" : "/signup";
    if (location.pathname === '/login') { buttonText = 'Sign Up'; target = '/signup'; }
    if (location.pathname === '/signup') { buttonText = 'Log In'; target = '/login'; }
    return (
        <Container>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <button type="button" onClick={() => navigate(target)}>
                {buttonText}
            </button>
        </Container>
    )
}

export default Header;

const Container = styled.div`
    padding: 0 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;

    .logo img {
        height: 5.5rem;
    }

    button {
        width: 120px;
        height: 40px;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-size: 1rem;
    }

    /* Laptop (Medium Screens) */
    @media (max-width: 1024px) {
        padding: 0 2rem;
        .logo img {
            height: 4.5rem;
        }
        button {
            width: 110px;
            height: 38px;
        }
    }

    /* Tablet */
    @media (max-width: 768px) {
        padding: 0 1.5rem;

        .logo img {
            height: 4rem;
        }

        button {
            width: 100px;
            height: 36px;
            font-size: 0.9rem;
        }
    }

    /* Mobile */
    @media (max-width: 480px) {
        padding: 0 1rem;

        .logo img {
            height: 3.5rem;
        }

        button {
            width: 90px;
            height: 34px;
            font-size: 0.85rem;
        }
    }
`;


