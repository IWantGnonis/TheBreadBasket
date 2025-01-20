import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import Config from '../models/config.js';
import Cart from '../models/cart.js';
import Product from '../models/product.js';
import mongoose from 'mongoose';
import session from 'express-session';



// Get all products
router.get('/shop', async (req, res) => {
    try {
        // Add connection check
        if (!mongoose.connection.readyState) {
            throw new Error('Database not connected');
        }

        const products = await Product.find();
        console.log('Products found:', products); // Debug log
        
        // Handle case where session or userId might not exist
        const userId = req.session?.userId;
        const cart = userId ? await Cart.findOne({ userId }) : null;
        const cartCount = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
        
        if (!products) {
            throw new Error('No products found');
        }
        
        res.render('shop', { 
            products,
            cartCount,
            error: null
        });
    } catch (error) {
        // More detailed error logging
        console.error('Error fetching products:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        res.render('shop', {
            products: [],
            cartCount: 0,
            error: 'Error loading products: ' + error.message
        });
    }
});

// Get cart page
router.get('/cart', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.session.userId })
            .populate('items.productId');

        const cartItems = cart ? cart.items.map(item => ({
            id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            quantity: item.quantity
        })) : [];

        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = 5.00;
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shipping + tax;

        res.render('cart', {
            cartItems,
            subtotal,
            shipping,
            tax,
            total,
            cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).send('Error loading cart');
    }
});

// Add to cart
router.post('/cart/add', async (req, res) => {
    try {
        const { productId } = req.body;
        
        // Add debug logs
        console.log('Session:', req.session);
        console.log('User ID:', req.session?.userId);
        
        // Check if user is logged in
        if (!req.session || !req.session.userId) {
            return res.status(401).json({ 
                success: false, 
                error: 'Please log in to add items to cart' 
            });
        }

        // Find or create cart
        let cart = await Cart.findOne({ userId: req.session.userId });
        console.log('Existing cart:', cart); // Debug log

        if (!cart) {
            cart = new Cart({
                userId: req.session.userId,
                items: []
            });
            console.log('New cart created:', cart); // Debug log
        }

        // Add item to cart
        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += 1;
        } else {
            cart.items.push({
                productId: productId,
                quantity: 1
            });
        }

        await cart.save();
        console.log('Cart after save:', cart); // Debug log

        const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

        res.json({ 
            success: true, 
            cartCount 
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to add to cart: ' + error.message 
        });
    }
});

// Update cart quantity
router.post('/cart/update', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.session.userId });

        if (cart) {
            if (quantity <= 0) {
                cart.items = cart.items.filter(item => 
                    item.productId.toString() !== productId
                );
            } else {
                const item = cart.items.find(item => 
                    item.productId.toString() === productId
                );
                if (item) {
                    item.quantity = quantity;
                }
            }
            await cart.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ success: false, error: 'Failed to update cart' });
    }
});

// Remove from cart
router.post('/cart/remove', async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ userId: req.session.userId });

        if (cart) {
            cart.items = cart.items.filter(item => 
                item.productId.toString() !== productId
            );
            await cart.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, error: 'Failed to remove from cart' });
    }
});

export default router; 