import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import Logout from '../Logout';
import Quizz from '../Quizz';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const [userSession, setUserSession] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
       const listener =  onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate('/')
        })
        return listener
    }, [])

    return userSession === null ? (
        <>
            <div className='loader'></div>
            <p className='loaderText'>Loading...</p>
        </>
    ) : (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quizz />
            </div>
        </div>

    );
};

export default Welcome;