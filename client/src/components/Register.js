import React                    from 'react';
import { useState }             from 'react';
import { Link, useNavigate }    from 'react-router-dom';
import { register }             from '../apis/user';
import { Button, Form }         from "react-bootstrap";
import '../css/form.css';

function Register() {
    const navigate = useNavigate();
    const [name, setName]               = useState('');
    const [email, setEmail]             = useState('');
    const [password, setPassword]       = useState('');
    const [selectRadio, setSelectRadio] = useState('');

    async function registerUser(event) {
        event.preventDefault();
        const response = await register({
            name        : name,
            email       : email,
            password    : password,
            userType    : selectRadio,
        });
        if (response.reply === 'Success') {
            navigate('../', { replace: true });
        }
    }

    


    return (
        <div className='container-div'>
            <React.Fragment>
                <div className="main-form">
                    <div className="form-container">
                        <div className="heading">
                            <h1>Register</h1>
                        </div>
                        <div className="forms">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <div className='radio-input'>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            id="inline-radio-1"
                                            name='user'
                                            value='student'
                                            label="Student"
                                            onChange={(e) => setSelectRadio(e.target.value)}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            name='user'
                                            value='staff'
                                            id="inline-radio-2"
                                            label="Staff"
                                            onChange={(e) => setSelectRadio(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Control
                                        type="name"
                                        placeholder="Enter your full name"
                                        autoComplete='off'
                                        name='name'
                                        value={name}
                                        className="input-data  "
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Control
                                        type="email"
                                        placeholder="Enter E-mail"
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
                                <Button variant="primary" type="submit" onClick={registerUser}>
                                    Register
                                </Button>
                            </Form>
                            <div className="link-form"><h6>Already have an account?  <Link style={{ textDecoration: 'none', color: '#3D5A80' }} to="/">Login here</Link> </h6> </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
}

export default Register;
