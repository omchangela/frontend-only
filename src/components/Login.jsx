import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/v1/login`, {
                email,
                password,
            });

            // Assuming the response contains a token
            const { token } = response.data;

            // Store the token in localStorage with 'Bearer' prefix
            localStorage.setItem('authToken', `Bearer ${token}`);

            // Navigate to the services page after successful login
            navigate('/services'); // Redirect to /services
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '30rem' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Login</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
