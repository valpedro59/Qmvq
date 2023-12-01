import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from '../Firebase/firebaseConfig';
import { setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';


const Signup = (props) => {
    const navigate = useNavigate();
    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    // state
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('')


    //handle change method
    const handleChange = e => {
        setLoginData({
            ...loginData, [e.target.id]: e.target.value
        })
    }

    //handle submit method

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = loginData;
        createUserWithEmailAndPassword(auth, email, password)
        .then(authUser => {
          return setDoc(user(authUser.user.uid), {
            pseudo,
            email
          })
        })
        .then(() => {
            setLoginData({...data});
            navigate('/welcome');
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }

    // Destructuring data
    const { pseudo, email, password, confirmPassword } = loginData;


    // Sign up Button activation
    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Sign Up</button> : <button>Sign Up</button>

    // manage errors
    const errorMsg = error !== '' && <span>{error.message}</span>;


    return (
      <div className="signUpLoginBox">
        <div className="slContainer">
          <div className="formBoxLeftSignup"></div>
          <div className="formBoxRight">
            <div className="formContent">
              {errorMsg}

              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                {/* Pseudo div */}
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={pseudo}
                    type="text"
                    id="pseudo"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="pseudo">Pseudo</label>
                </div>

                {/* Email div */}
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    id="email"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                {/* Password div */}
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={password}
                    type="password"
                    id="password"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {/* Confirm Password div */}
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    value={confirmPassword}
                    type="password"
                    id="confirmPassword"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                {btn}
              </form>
              {/* link Container */}
              <div className="linkContainer">
                <Link className="simpleLink" to="/login">
                  Already have an account ? Click there
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Signup;