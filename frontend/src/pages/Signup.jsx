import React, { useState } from 'react'
import styled from 'styled-components'
import BackgroundImage from '../components/BackgroundImage'
import Header from '../components/Header'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utils/fire-base-config'
import { Navigate, useNavigate } from 'react-router-dom'


const Signup = () => {

    const [showPassword, setshowPassword] = useState(false);
    const navigate = useNavigate();
    const [formValues, setformValues] = useState({
        email: "",
        password: "",
    });

    const handleSignIn = async () => {
        try {
            const { email, password } = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error)
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
    })

    return (
        <Container $showPassword={showPassword}>
            <BackgroundImage />
            <div className="content items-center">
                <Header />
                <div className="body flex flex-col items-center justify-center px-4 py-8">
                    <div className="text flex flex-col items-center">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 text-center">Unlimited movies,</h1>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 text-center">TV shows and</h1>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 text-center">more</h1>
                        <h4 className="text-base sm:text-xl mb-2 text-center">Watch anywhere. Cancel anytime</h4>
                        <h6 className="text-sm sm:text-base mb-4 text-center max-w-xl">Ready to watch? Enter your email to create or restart membership</h6>
                    </div>
                    <div className="form grid items-center gap-2 w-full max-w-3xl">
                        <input value={formValues.email} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value, })} type="email" placeholder='Email Address' name="email" className="p-4 rounded-md w-full sm:w-100 text-black" />
                        {showPassword && <input value={formValues.password} onChange={(e) => setformValues({ ...formValues, [e.target.name]: e.target.value, })} type="password" placeholder='password' name="password" className="p-4 rounded-md w-full sm:w-80 text-black" />}
                        {!showPassword && <button onClick={() => setshowPassword(true)} className="bg-red-600 text-white p-4 rounded-md w-full sm:w-80 font-bold">Get Started</button>}
                    </div>
                    <button onClick={handleSignIn} className='mt-4 text-white bg-red-600 rounded-md p-2 w-full sm:w-40 font-bold'>Log In</button>
                </div>
            </div>
        </Container>
    )
}

export default Signup

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
        grid-template-columns: ${({ $showPassword }) => $showPassword ? "1fr 1fr" : "2fr 2fr"};
    }
`;
