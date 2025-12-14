import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider, useCart } from './context/CartContext'; // 1. useCart ని ఇక్కడ ఇంపోర్ట్ చేసాం
import './App.css';

// Navbar Component
const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useCart(); // 2. Cart data ని ఇక్కడ తెచ్చుకుంటున్నాం
    const user = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '15px', background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div>
                <Link to="/" style={{ margin: '10px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
                
                {/* 3. ఇక్కడ Cart పక్కన Count చూపిస్తున్నాం */}
                <Link to="/cart" style={{ margin: '10px', color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                    Cart ({cart.length}) 
                </Link>
            </div>
            
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: '15px', fontWeight: 'bold' }}>Hello, {user}</span>
                        <button onClick={handleLogout} style={{ background: '#ff4757', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" style={{ margin: '10px', color: 'white', textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;