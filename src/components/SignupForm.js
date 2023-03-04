import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Checkbox from './Checkbox';
import { AuthContext } from './context/AuthProvider';
import Form from './Form';
import TextInput from './TextInput';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState('');

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { signup } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username)
        if (password !== confirmPassword) {
            return setError("Password doesn't match.");
        }
        try {
            setError('');
            setLoading(true);
            await signup(email, password, username);
            navigate(from, { replace: true });
        }
        catch (err) {
            setError("Failed to create an Account!");
            setLoading(false);
        }
    }
    return (
        <Form style={{ height: '500px' }} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                placeholder="Enter name"
                icon="person"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                type="password"
                placeholder="Enter password"
                icon="lock"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextInput
                type="password"
                placeholder="Confirm password"
                icon="lock_clock"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Checkbox
                text="I agree to the Terms & Conditions"
                required
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
            />
            <Button disabled={loading} type='submit'>
                <span>Submit Now</span>
            </Button>

            {
                error && <p className='error'>{error}</p>
            }
            <div className="info">
                Already have an account? <Link to="/login">Login</Link> instead.
            </div>
        </Form>
    );
};

export default SignupForm;