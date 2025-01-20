import express from 'express';
import User from '../models/user.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import bcrypt from 'bcrypt';

const router = express.Router();

//Signup
router.get('/signup', (req, res) => {
    res.render('signup', { error: null, success: null, username: '', email: '' });
});
  
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.render('signup', {
                error: 'All fields are required.',
                success: null,
                username,
                email,
            });
        }
  
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup', {
                error: 'Email is already registered.',
                success: null,
                username,
                email,
            });
        }
  
        // Hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
  
        // Redirect to signin with success message
        res.render('signin', { 
            error: null, 
            success: 'Registration successful! Please sign in.', 
            email: '' 
        });
    } catch (error) {
        res.render('signup', {
            error: error.message,
            success: null,
            username,
            email,
        });
    }
});
  
//Signin
router.get('/signin', (req, res) => {
    // Always pass both error and success variables
    res.render('signin', { 
        error: null, 
        success: null, 
        email: '' 
    });
});
  
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.render('signin', { 
                error: 'Invalid email or password', 
                success: null,
                email 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('signin', { 
                error: 'Invalid email or password', 
                success: null,
                email 
            });
        }

        // Set the session
        req.session.userId = user._id;
        req.session.username = user.username;
        
        // Add debug log
        console.log('Session after login:', req.session);

        res.redirect('/');
    } catch (error) {
        console.error('Sign-in error:', error);
        res.render('signin', {
            error: 'An error occurred during sign in. Please try again.',
            success: null,
            email: req.body.email
        });
    }
});

// Add logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
});

export default router; 