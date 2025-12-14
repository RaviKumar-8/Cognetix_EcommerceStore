import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register E-Store";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (err) {
            alert("Error: " + (err.response?.data?.message || "Registration failed"));
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none' }}>Register</button>
                <p>Already have an account! <a href='./Login'>Login</a></p>
            </form>
        </div>
    );
};

export default Register;