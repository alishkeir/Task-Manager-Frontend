import HTTPRequests from '../../services/http-requests.service';
import { useEffect, useState } from 'react';
import WithRouter from '../../utils/WithRouter';
import Header from '../../components/heder/Header';
import {
    FormControl,
    IconButton,
    Input,
    MenuItem,
    Select,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete } from '@mui/icons-material';

import './TasksList.scss';
import { useNavigate } from 'react-router-dom';

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [count, setCount] = useState(0);

    // ==================================================================================== //

    const navigate = useNavigate();

    // ==================================================================================== //

    useEffect(() => {
        HTTPRequests.getTasks().then((res) => {
            if (res) {
                if (res.status === 200) {
                    setTasks(res.data.reverse());
                    setCount(res.data.length);
                }
            }
        });
    }, []);

    // ==================================================================================== //

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setId('');
    };

    // ==================================================================================== //

    const updateTask = async (id, updateStatus) => {
        await HTTPRequests.updateTask(id, updateStatus).then((res) => {
            if (res.status === 401) {
                return navigate('/login');
            }
        });
    };

    // ==================================================================================== //

    const deleteTask = () => {
        HTTPRequests.deleteTask(id).then(async (res) => {
            if (res.status === 401) {
                return navigate('/login');
            }

            if (res.status === 200) {
                await handleClose();
                await document.getElementById(id).remove();
                if (count - 1 === 0) {
                    document.querySelector('.card-listing').innerHTML =
                        '<h2>You have no tasks!</h2>';
                }
                await setCount(count - 1);
            }
        });
    };

    // ==================================================================================== //

    const listTasks =
        tasks.length > 0 ? (
            tasks.map((task) => {
                return (
                    <Card key={task.id} className='card' id={task.id}>
                        <CardContent className='card-content'>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </CardContent>
                        <CardActions className='card-actions'>
                            <FormControl variant='standard'>
                                <Select
                                    style={{ width: '10rem' }}
                                    label={task.status}
                                    defaultValue={task.status}
                                    onChange={(e) =>
                                        updateTask(task.id, e.target.value)
                                    }
                                >
                                    <MenuItem value='OPEN'>Open</MenuItem>
                                    <MenuItem value='IN_PROGRESS'>
                                        In Progress
                                    </MenuItem>
                                    <MenuItem value='DONE'>Done</MenuItem>
                                </Select>
                            </FormControl>
                            <IconButton
                                style={{ color: '#ff0000' }}
                                onClick={() => {
                                    handleClickOpen();
                                    setTitle(task.title);
                                    setId(task.id);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </CardActions>
                    </Card>
                );
            })
        ) : (
            <h2>You have no tasks!</h2>
        );

    // ==================================================================================== //

    const filterTasks = async (newsSearch, newFilter) => {
        await HTTPRequests.getTasks({
            search: newsSearch,
            status: newFilter,
        }).then((res) => {
            if (res.status === 200) {
                setTasks(res.data.reverse());
                setCount(res.data.length);
            }

            if (res.status === 401) {
                return navigate('/login');
            }
        });
    };

    // ==================================================================================== //

    return (
        <>
            <Header />
            <div className='tasks-filter'>
                <FormControl variant='standard'>
                    <Input
                        onChange={async (e) => {
                            await setSearch(e.target.value);
                            await filterTasks(e.target.value, status);
                        }}
                        startAdornment={
                            <InputAdornment
                                position='start'
                                style={{ color: '#000' }}
                            >
                                <Search color='inherit' />
                            </InputAdornment>
                        }
                        placeholder='Search...'
                    />
                </FormControl>

                <FormControl variant='standard'>
                    <Select
                        style={{ width: '10rem' }}
                        label='No status filter'
                        value={status || ''}
                        onChange={async (e) => {
                            await setStatus(e.target.value);
                            await filterTasks(search, e.target.value);
                        }}
                    >
                        <MenuItem selected value='all'>
                            No status filter
                        </MenuItem>
                        <MenuItem value='OPEN'>Open</MenuItem>
                        <MenuItem value='IN_PROGRESS'>In Progress</MenuItem>
                        <MenuItem value='DONE'>Done</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='card-listing'>{listTasks}</div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {`Delete "${title}" ?`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        This action cannot be undone
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => deleteTask()}
                        autoFocus
                        color='error'
                    >
                        Delete
                    </Button>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default WithRouter(TasksList);
