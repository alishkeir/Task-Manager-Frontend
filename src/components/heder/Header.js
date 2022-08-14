import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logout from '@mui/icons-material/Logout';

import { Button, IconButton } from '@mui/material';
import './Header.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import HTTPRequests from '../../services/http-requests.service';

const Header = () => {
    const HandleLogout = (e) => {
        e.preventDefault();
        HTTPRequests.logout();

    };
    return (
        <div className='header'>
            <h2>Getting things done.</h2>
            <Link to={{ pathname: '/create' }}>
                <Button
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    variant='contained'
                    color='primary'
                    className='add-task-button'
                >
                    New Task
                </Button>
            </Link>
            <IconButton color='inherit' onClick={(e) => HandleLogout(e)}>
                <Logout />
            </IconButton>
        </div>
    );
};

export default Header;
