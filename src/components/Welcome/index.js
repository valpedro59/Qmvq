import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../Firebase/firebaseConfig';
import { getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';
import Quizz from '../Quizz';

const Welcome = props => {
    const navigate = useNavigate();
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
       const listener =  onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate('/')
        })
        if (!!userSession) {
            const colref = user(userSession.uid);

            getDoc(colref)
            .then(snapshot => {
                if (snapshot.exists ()) {
                    const myData = snapshot.data();
                    setUserData(myData);
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
        return listener
    }, [userSession]);

    return userSession === null ? (
        <>
            <div className='loader'></div>
            <p className='loaderText'>Loading...</p>
        </>
    ) : (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quizz userData={userData}/>
            </div>
        </div>

    );
};

export default Welcome;