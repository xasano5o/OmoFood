// Login.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        login: '',
        password: '',
    });

    const correctLogin = 'xasan';
    const correctPassword = '1234';

    const handleLogin = () => {
        if (credentials.login === correctLogin && credentials.password === correctPassword) {
            navigate('/admin/home');
        } else {
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6">
                <div className="card shadow">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Login</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    required
                                />
                                <span
                                    className="position-absolute top-50 end-0 px-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showPassword ? <FaEye className='text-2xl' /> : <FaEyeSlash className='text-2xl' />}
                                </span>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
