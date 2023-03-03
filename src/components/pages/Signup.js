import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Form from '../Form';
import Illustration from '../Illustration';
import classes from '../styles/Signup.module.css';
import TextInput from '../TextInput';

const Signup = () => {
    return (
        <>
            <h1>Create an account</h1>
            <div class="column">
                <Illustration />
                <Form className={`${classes.signup}`} >
                    <TextInput type="text" placeholder="Enter name" icon="person" />
                    <TextInput type="text" placeholder="Enter email" icon="alternate_email" />
                    <TextInput type="password" placeholder="Enter password" icon="lock" />
                    <TextInput type="password" placeholder="Confirm password" icon="lock_clock" />
                    <Checkbox text="I agree to the Terms & Conditions"/>
                    <Button><span>Submit Now</span></Button>

                    <div class="info">
                        Already have an account? <Link to="/login">Login</Link> instead.
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Signup;