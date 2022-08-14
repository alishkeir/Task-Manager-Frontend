import './App.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TasksList from './pages/tasks-list/TasksList';
import CreateTaskPage from './pages/create-task/CreateTaskPage';
import { ProtectedRoute } from './utils/Protected';
import { AuthRoute } from './utils/AuthRoute';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes basename={process.env.PUBLIC_URL || ''}>
                <Route exact path='/login' element={<AuthRoute />}>
                    <Route path='/login' element={<Login />} />
                </Route>

                <Route exact path='/register' element={<AuthRoute />}>
                    <Route path='/register' element={<Register />} />
                </Route>
                <Route exact path='/' element={<ProtectedRoute />}>
                    <Route exact path='/' element={<TasksList />} />
                </Route>
                <Route exact path='/create' element={<ProtectedRoute />}>
                    <Route exact path='/create' element={<CreateTaskPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
