import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
            document.title = "Login E-Store";
        }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token); // Token save chestunnam
            localStorage.setItem('username', res.data.username);
            alert("Login Successful!");
            navigate('/'); // Home page ki redirect
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Login failed"));
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', border: 'none' }}>Login</button>
                <p>Don't have an account? <a href='./Register'>Register</a></p>
            </form>
        </div>
    );
};

export default Login;