import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HTTPRequests from '../../services/http-requests.service';
import WithRouter from '../../utils/WithRouter';
import './CreateTaskPage.scss';

const CreateTaskPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    // ==================================================================================== //

    const navigate = useNavigate();

    // ==================================================================================== //

    const createTask = (e) => {
        e.preventDefault();

        HTTPRequests.createTask(title, description).then((res) => {
            if (res.status === 201) {
                return navigate('/');
            }

            if (res.status === 400) {
                setErrors(res.data.message);
            }

            if (res.status === 401) {
                return navigate('/login');
            }
        });

        return;
    };

    // ==================================================================================== //

    const showErrors = errors.map((error) => {
        return (
            <li key={error}>
                {error.charAt(0).toUpperCase() + error.slice(1)}
            </li>
        );
    });

    // ==================================================================================== //

    return (
        <div className='task-form-container'>
            <div className='form-inner'>
                <div className='form-header'>
                    <Link to='/' className='back-button'>
                        <Button variant='contained' color='warning'>
                            Back
                        </Button>
                    </Link>
                    <h1>Create a Task</h1>
                </div>
                <p>Provide information about the task you wish to complete.</p>

                <div
                    className='task-errors-container'
                    style={{ display: errors.length === 0 ? 'none' : 'block' }}
                >
                    <h2>Oops!</h2>
                    <ul>{showErrors}</ul>
                </div>

                <form onSubmit={(e) => createTask(e)}>
                    <TextField
                        label='Title*'
                        variant='outlined'
                        size='small'
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                        label='Description*'
                        multiline
                        rows={8}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        className='add-task-button'
                        type='submit'
                    >
                        Create Task
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default WithRouter(CreateTaskPage);
