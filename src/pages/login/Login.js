import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HTTPRequests from '../../services/http-requests.service';
import WithRouter from '../../utils/WithRouter';
import './Login.scss';

const Login = () => {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ==================================================================================== //

    const navigate = useNavigate();

    // ==================================================================================== //

    const LoginUser = (e) => {
        e.preventDefault();

        HTTPRequests.login(username, password).then(async (res) => {
            if (res.status === 201) {
                let newToken = {
                    key: res.data.accessToken,
                    expires_in: Date.now() + 3600 * 1000,
                };
                await localStorage.setItem(
                    'access_token',
                    JSON.stringify(newToken)
                );
                await navigate('/');
            }

            if (res.status === 401) {
                setError(res.data.message);
            }
        });
    };

    // ==================================================================================== //

    return (
        <div className='login-form-container'>
            <div className='form-inner'>
                <div className='form-header'>
                    <h1>Hello!</h1>
                    <p>Fill in your username and password to sign in.</p>
                </div>
                <div
                    className='task-errors-container'
                    style={{ display: error.length === 0 ? 'none' : 'block' }}
                >
                    <h2>Oops!</h2>
                    <ul>
                        <li>
                            {error.charAt(0).toUpperCase() + error.slice(1)}
                        </li>
                    </ul>
                </div>

                <form onSubmit={(e) => LoginUser(e)}>
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

                    <Button
                        variant='contained'
                        className='add-task-button'
                        type='submit'
                    >
                        Login
                    </Button>

                    <Link
                        to={{ pathname: '/register' }}
                        className='register-link'
                    >
                        <Button
                            variant='text'
                            className='add-task-button'
                            type='submit'
                        >
                            Don't have an account? Sign up now!
                        </Button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default WithRouter(Login);
