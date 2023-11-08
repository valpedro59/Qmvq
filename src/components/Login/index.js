import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';


const Login = (props) => {

  const navigate = useNavigate();
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (password.length > 5 && email !== '') {
      setBtn(true);
    }
    else if (btn === true) {
      setBtn(false);
    }
  }, [password, email, btn])

  const handleSubmit = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      setEmail('');
      setPassword('');
      navigate('/welcome', {replace: 'true'});

    })
    .catch(error => {
      setError(error);
      setEmail('');
      setPassword('');
    })
  }

  const errorMsg = error !== '' && <span>{error.message}</span>;


    return (
      <div className="signUpLoginBox">
        <div className="slContainer">
          <div className="formBoxLeftLogin"></div>
          <div className="formBoxRight">
            <div className="formContent">
              {errorMsg}

              <h2>Sign In</h2>
              <form onSubmit={handleSubmit}>

                {/* Email div */}
                <div className="inputBox">
                  <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                {/* Password div */}
                <div className="inputBox">
                  <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    autoComplete="off"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {<button disabled = {btn ? false : true}>Sign In</button>}
              </form>
              {/* link Container */}
              <div className="linkContainer">
                <Link className="simpleLink" to="/signup">
                  Don't have an account ? Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;