import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import

const Cart = () => {
    const { cart, removeFromCart, setCart } = useCart();
    const navigate = useNavigate(); // 2. Hook Initialize
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    useEffect(() => {
        document.title = 'E-Store Cart';
    }, []);

    const handleCheckout = () => {
        // --- SECURITY CHECK START ---
        const token = localStorage.getItem('token'); // Check weather the Token is there
        
        if (!token) {
            alert("Please login to place an order!");
            navigate('/login'); // go to Login Page if not in Login
            return;
        }
        // --- SECURITY CHECK END ---

        // order is placed if the user is logged in 
        axios.post('http://localhost:5000/api/orders', 
            { items: cart, total },
            { headers: { Authorization: token } } // Optional: Send token for Backend verification
        )
        .then(res => {
            alert("Order Placed Successfully! 🎉");
            setCart([]); 
        })
        .catch(err => {
            console.log(err);
            alert("Order Failed");
        });
    };

    return (
        <div className="cart-container">
            <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Shopping Cart</h2>
            
            {cart.length === 0 ? (
                <p style={{ textAlign: 'center', margin: '20px' }}>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item._id} className="cart-item">
                            <div>
                                <h4 style={{ margin: 0 }}>{item.name}</h4>
                                <small>Quantity: {item.qty}</small>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <p style={{ fontWeight: 'bold', margin: 0 }}>₹{item.price * item.qty}</p>
                                <button 
                                    onClick={() => removeFromCart(item._id)} 
                                    style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div style={{ marginTop: '20px', textAlign: 'right' }}>
                        <h3>Total Amount: ₹{total}</h3>
                    </div>
                    
                    <button onClick={handleCheckout} className="checkout-btn">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;