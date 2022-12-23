import React                            from 'react';
import { BrowserRouter, Routes, Route}  from 'react-router-dom';
import Login                            from './components/Login';
import Register                         from './components/Register';
import StaffDashboard                   from './components/staffDashboard';
import StudentDashboard                 from './components/studentDashboard';
import './App.css';

function App() {
    return (
        <div>
            <BrowserRouter basename='/'>
                <Routes>    
                    <Route path = "/" element = {<Login />} />
                    <Route path = "/register" element = {<Register />} />
                    <Route path = "/studentDashboard" element = {<StudentDashboard/>} />
                    <Route path = "/staffDashboard" element = {<StaffDashboard/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;