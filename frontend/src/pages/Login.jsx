import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/fire-base-config'
import {useNavigate } from 'react-router-dom'


const Login = () => {

    const [showPassword, setshowPassword] = useState(false);
   const navigate =  useNavigate();
    const [formValues, setformValues] =useState({
        email: "",
        password: "",
    });

    const handleLogIn = async()=>{
        try{
            const {email, password} = formValues;
            await signInWithEmailAndPassword(firebaseAuth,email,password);
        }catch(error){
            console.log(error)
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser)=> {
        if(currentUser) navigate("/");
    })

  return (
    <Container>
        <BackgroundImage/>
        <div className="content items-center">
          <Header/>
          <div className="form-container flex column a-center j-center items-center">
            <div className="form flex column a-center j-center items-center ">
              <div className="title item">
                <h3 className='font-bold text-2xl p-5'>Login</h3>
              </div>
              <div className="container flex column items-center gap-4">
                <input value={formValues.email} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value, })} type="email" placeholder='Email Address' name="email" className="p-4 rounded-md w-80 text-black" />
                        <input value={formValues.password} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value, })} type="password" placeholder='password' name="password" className="p-4 rounded-md w-80 text-black" />
                      <button onClick={handleLogIn} className="bg-red-600 text-white p-4 rounded-md w-80 font-bold">Log In</button>
              </div>
            </div>
          </div>
        </div>
    </Container>
  )
}

export default Login

const Container = styled.div`
position: relative;
.content{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 15vh 85vh;    
}
  .form{
    grid-template-columns: ${({showPassword})=>showPassword ? "1fr 1fr" : "2fr 2fr"};
    background-color: #000000b0;
    width: 25vw;
    height: 50vh;
    gap: 2rem;
  }

  /* Responsive for Tablet (769px to 1024px) */
  @media (max-width: 1024px) {
    .content {
      grid-template-rows: 12vh 88vh;
    }
    .form {
      width: 35vw;
      height: 45vh;
      gap: 1.5rem;
      .title h3 {
        font-size: 1.5rem;
      }
      .container {
        input, button {
          width: 100% !important;
          padding: 0.75rem 1rem;
        }
      }
    }
  }

  /* Responsive for Mobile (481px to 768px) */
  @media (max-width: 768px) {
    .content {
      grid-template-rows: 10vh 90vh;
    }
    .form {
      width: 80vw;
      max-width: 450px;
      height: auto;
      padding: 2rem 1.5rem;
      gap: 1.25rem;
      .title h3 {
        font-size: 1.3rem;
        padding: 0.75rem;
      }
      .container {
        gap: 1rem;
        input, button {
          width: 100% !important;
          padding: 0.65rem 0.75rem;
          font-size: 0.95rem;
        }
      }
    }
  }

  /* Responsive for Small Mobile (below 480px) */
  @media (max-width: 480px) {
    .content {
      grid-template-rows: 8vh 92vh;
    }
    .form {
      width: 90vw;
      max-width: 350px;
      height: auto;
      padding: 1.5rem 1rem;
      gap: 1rem;
      .title h3 {
        font-size: 1.1rem;
        padding: 0.5rem;
      }
      .container {
        gap: 0.75rem;
        input, button {
          width: 100% !important;
          padding: 0.6rem 0.7rem;
          font-size: 0.9rem;
        }
      }
    }
  }

  /* Responsive for Extra Small Mobile (below 370px) */
  @media (max-width: 370px) {
    .content {
      grid-template-rows: 7vh 93vh;
    }
    .form {
      width: 95vw;
      height: auto;
      padding: 1rem 0.75rem;
      gap: 0.75rem;
      .title h3 {
        font-size: 1rem;
        padding: 0.25rem;
      }
      .container {
        gap: 0.6rem;
        input, button {
          width: 100% !important;
          padding: 0.5rem 0.6rem;
          font-size: 0.85rem;
        }
      }
    }
  }
`;



