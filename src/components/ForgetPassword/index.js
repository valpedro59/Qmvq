import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';


const ForgetPassword = props => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // handle On Submit

    const handleSubmit = e => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(()=> {
            setError(null);
            setSuccess(`Check your mail ${email} to change the password`);
            setEmail('');

            //redirection
            setTimeout(() => {
                navigate('/login')
            }, 5000)
        })
        .catch(error => {
            setError(error);
            setEmail("");
        })
    }

    const disabled = email === "";

    
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        {
                            success && <span
                                style={{
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}
                            >
                                {success}
                            </span>
                        }

                        {error && <span>{error.message}</span>}

                        <h2>Forgotten Password</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Recover</button>

                        </form>

                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;