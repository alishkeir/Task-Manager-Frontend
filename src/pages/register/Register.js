import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HTTPRequests from '../../services/http-requests.service';
import WithRouter from '../../utils/WithRouter';
import './Register.scss';

const Login = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ==================================================================================== //

    const navigate = useNavigate();

    // ==================================================================================== //

    const RegisterUser = (e) => {
        e.preventDefault();

        HTTPRequests.register(username, password).then(async (res) => {
            if (res.status === 201) {
                await navigate('/login');
            }

            if (res.status === 409 || res.status === 400) {
                if (typeof res.data.message) {
                    setErrors([res.data.message]);
                } else {
                    setErrors(res.data.message);
                }
            }
        });
    };

    // ==================================================================================== //

    const showErrors = errors.map((error) => {
        console.log(error);
        return <li key={error}>{error}</li>;
    });

    // ==================================================================================== //

    return (
        <div className='register-form-container'>
            <div className='form-inner'>
                <div className='form-header'>
                    <h1>Join us!</h1>
                    <p>Start managing tasks easily.</p>
                </div>
                <div
                    className='task-errors-container'
                    style={{ display: errors.length === 0 ? 'none' : 'block' }}
                >
                    <h2>Oops!</h2>
                    <ul>{showErrors}</ul>
                </div>

                <form onSubmit={(e) => RegisterUser(e)}>
                    <TextField
                        label='Username*'
                        variant='outlined'
                        size='small'
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label='Password*'
                        size='small'
                        variant='outlined'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className='hint'>
                        Passwords must contain at least 1 upper case letter, 1
                        lower case letter and one number OR special charracter.
                    </p>
                    <hr />

                    <Button
                        variant='contained'
                        className='add-task-button'
                        type='submit'
                    >
                        Signup
                    </Button>

                    <Link to={{ pathname: '/login' }} className='login-link'>
                        <Button
                            variant='text'
                            className='add-task-button'
                            type='submit'
                        >
                            Do you have an account? Login Instead!
                        </Button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default WithRouter(Login);
