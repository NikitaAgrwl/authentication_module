import React                    from "react";
import { useState, useEffect }  from 'react';
import { update }               from '../apis/user';
import { Button, Form }         from "react-bootstrap";
import { MDBFile }              from 'mdb-react-ui-kit';
import { useNavigate }          from "react-router-dom";
import '../css/form.css';
import '../css/stdDashboard.css';

function StudentDashboard() {
    const [name, setName]       = useState('');
    const [email, setEmail]     = useState('');
    const [city, setCity]       = useState('');
    const [contact, setContact] = useState('');
    const navigate              = useNavigate();

    function loadInitialData() {
        let initialData = JSON.parse(localStorage.getItem('loggedInUser'));
        setName(initialData.token.name)
        setEmail(initialData.token.email)
    }

    async function handleForm() {
        let payload = {
            name    : name,
            email   : email,
            city    : city,
            contact : contact
        }
        let response = await update(payload);
        if (response.reply === 'Success') {
            alert("Data updated successfully");
        }
    }

    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    }

    useEffect(() => {
        loadInitialData();
    }, [])

    return (
        <div className='container-div'>
            <React.Fragment>
                <div className="main-form">
                    <div className="form-container">
                        <div className="heading">
                            <h2>Update Details</h2>
                        </div>
                        <div className="forms">
                            <Form>

                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Control
                                        disabled
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
                                        disabled
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
                                        type="text"
                                        autoComplete='off'
                                        name='city'
                                        placeholder="Enter your city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="input-data" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="tel"
                                        autoComplete='off'
                                        name='contact'
                                        placeholder="Enter contact"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        className="input-data" />
                                </Form.Group>
                                <Form.Group>
                                    <div className="file-div">
                                        <MDBFile label='Upload your resume' size='sm' id='formFileSm' />
                                    </div>
                                </Form.Group>

                                <Button variant="primary" type="submit" onClick={handleForm}>
                                    Update
                                </Button>
                                <Button variant="primary" type="submit" onClick={handleLogout}>
                                    Log Out
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    )
}

export default StudentDashboard;