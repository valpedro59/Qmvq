import React from 'react';
import Logout from '../Logout';
import Quizz from '../Quizz';

const Welcome = () => {
    return (
        <div className='quiz-bg'>
            <div className='container'>
                <Logout />
                <Quizz />
            </div>
        </div>
    );
};

export default Welcome;