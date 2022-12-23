import React, { useEffect }     from 'react';
import { useState }             from 'react';
import { Button, Form }         from "react-bootstrap";
import { Link, useNavigate }    from 'react-router-dom';
import { login }                from '../apis/user';
import '../css/form.css';

function Login() {
    const navigate                = useNavigate();
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(event) {
        event.preventDefault();
        const response = await login({
            email    : email,
            password : password
        });
        if (response.reply === 'success') {
            localStorage.setItem('loggedInUser', JSON.stringify({
                loginStatus : true,
                token       : response.payload
            }))
        }
        if(response.reply === 'success' && response.payload.userType === 'student'){
            navigate('/studentDashboard');
        }
        if(response.reply === 'success' && response.payload.userType === 'staff'){
            navigate('/staffDashboard');
        }
        if (response.reply === 'Unauthorized') {
            alert("Invalid Username and Password");
        }
    }

    useEffect(() => {
        let existingUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if(existingUser?.loginStatus && existingUser?.token?.userType === 'student'){
            navigate('../studentDashboard', {replace: true});
        }
        if(existingUser?.loginStatus && existingUser?.token?.userType === 'staff'){
            navigate('/staffDashboard');
        }

    }, [])

    return (
        <div className='container-div'>
            <React.Fragment>
                <div className="main-form">
                    <div className="form-container">
                        <div className="heading">
                            <h1>Login</h1>
                        </div>
                        <div className="forms">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        autoComplete='off'
                                        name='email'
                                        value={email}
                                        className="input-data  "
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        autoComplete='off'
                                        name='password'
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-data" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={loginUser}>
                                    Login
                                </Button>
                            </Form>
                            <div className="link-form"><h6>Don't have an account?  <Link style={{textDecoration: 'none', color: '#3D5A80'}} to="/register">Register here  </Link> </h6> </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
}

export default Login;
