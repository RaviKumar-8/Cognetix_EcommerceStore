import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        document.title = 'E-Store';
        axios.get('http://localhost:5000/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1 style={{ marginTop: '20px', color: '#1e3c72' }}>Welcome to E-Store</h1>
            <div className="products-container">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>₹{product.price}</p>
                        </div>
                        <button 
                            className="add-btn"
                            onClick={() => addToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;