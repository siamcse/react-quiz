import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { AuthContext } from './context/AuthProvider';
import Form from './Form';
import TextInput from './TextInput';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate(from, { replace: true });
        }
        catch (err) {
            setError("Failed to login an Account!");
            setLoading(false);
        }
    }

    return (
        <Form style={{ height: '330px' }} onSubmit={handleSubmit}>
            <TextInput
                type="text"
                placeholder="Enter emaili"
                icon="alternate_email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
                type="password"
                placeholder="Enter password"
                icon="lock" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' disabled={loading}>
                <span>Submit Now</span>
            </Button>

            {
                error && <p className='error'>{error}</p>
            }

            <div className="info">Don't have an account? <Link to="/signup">Signup</Link> instead.</div>
        </Form>
    );
};

export default LoginForm;