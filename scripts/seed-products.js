import mongoose from 'mongoose';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Product from '../models/product.js';
import bcrypt from 'bcryptjs';

// Configure dotenv
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Unsplash API instance
const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY || 'YOUR_UNSPLASH_ACCESS_KEY',
    fetch: nodeFetch,
});

// Helper function to get a bakery image from Unsplash API
const getBakeryImage = async (searchTerm) => {
    try {
        const result = await unsplash.search.getPhotos({
            query: `bakery ${searchTerm}`,
            perPage: 1,
            orientation: 'landscape'
        });
        
        if (result.errors) {
            console.log('Error occurred: ', result.errors[0]);
            return 'https://placehold.co/400x300/F8F4E1/543310.png?text=Bakery+Item';
        }
        
        // Return the regular size image URL or a placeholder if no results
        return result.response.results[0]?.urls?.regular || 
               'https://placehold.co/400x300/F8F4E1/543310.png?text=Bakery+Item';
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'https://placehold.co/400x300/F8F4E1/543310.png?text=Bakery+Item';
    }
};

const products = [
    {
        name: "Sourdough Bread",
        description: "Fresh artisanal sourdough bread made daily",
        price: 6.99,
        category: "Breads",
        searchTerm: "sourdough bread"
    },
    {
        name: "Chocolate Croissant",
        description: "Buttery, flaky croissant filled with rich chocolate",
        price: 4.99,
        category: "Pastries",
        searchTerm: "chocolate croissant"
    },
    {
        name: "Classic Baguette",
        description: "Traditional French baguette with crispy crust",
        price: 3.99,
        category: "Breads",
        searchTerm: "baguette"
    },
    {
        name: "Cinnamon Roll",
        description: "Soft, gooey cinnamon roll with cream cheese frosting",
        price: 4.49,
        category: "Pastries",
        searchTerm: "cinnamon roll"
    },
    {
        name: "Whole Grain Loaf",
        description: "Nutritious whole grain bread packed with seeds",
        price: 5.99,
        category: "Breads",
        searchTerm: "whole grain loaf"
    },
    {
        name: "Blueberry Muffin",
        description: "Moist muffin loaded with fresh blueberries",
        price: 3.49,
        category: "Pastries",
        searchTerm: "blueberry muffin"
    },
    {
        name: "Chocolate Cake",
        description: "Rich chocolate layer cake with ganache frosting",
        price: 28.99,
        category: "Cakes",
        searchTerm: "chocolate cake"
    },
    {
        name: "Almond Croissant",
        description: "Flaky croissant filled with almond cream",
        price: 4.99,
        category: "Pastries",
        searchTerm: "almond croissant"
    },
    {
        name: "Rye Bread",
        description: "Traditional rye bread with caraway seeds",
        price: 5.99,
        category: "Breads",
        searchTerm: "rye bread"
    },
    {
        name: "Vanilla Cupcake",
        description: "Classic vanilla cupcake with buttercream frosting",
        price: 3.49,
        category: "Cakes",
        searchTerm: "vanilla cupcake"
    },
    {
        name: "Apple Danish",
        description: "Flaky pastry filled with spiced apple compote",
        price: 4.49,
        category: "Pastries",
        searchTerm: "apple danish"
    },
    {
        name: "Carrot Cake",
        description: "Spiced carrot cake with cream cheese frosting",
        price: 26.99,
        category: "Cakes",
        searchTerm: "carrot cake"
    },
    {
        name: "Red Velvet Cake",
        description: "Classic red velvet cake with cream cheese frosting and chocolate shavings",
        price: 32.99,
        category: "Cakes",
        searchTerm: "red velvet cake"
    },
    {
        name: "Focaccia",
        description: "Italian flatbread with rosemary, olive oil, and sea salt",
        price: 7.99,
        category: "Breads",
        searchTerm: "focaccia"
    },
    {
        name: "Fruit Tart",
        description: "Buttery pastry shell filled with vanilla custard and fresh seasonal fruits",
        price: 5.99,
        category: "Pastries",
        searchTerm: "fruit tart"
    },
    {
        name: "Brioche Loaf",
        description: "Rich, buttery French bread perfect for breakfast",
        price: 8.99,
        category: "Breads",
        searchTerm: "brioche loaf"
    },
    {
        name: "Tiramisu Slice",
        description: "Italian coffee-flavored dessert with layers of mascarpone and cocoa",
        price: 6.99,
        category: "Cakes",
        searchTerm: "tiramisu slice"
    },
    {
        name: "Cheese Danish",
        description: "Flaky pastry filled with sweet cream cheese",
        price: 4.49,
        category: "Pastries",
        searchTerm: "cheese danish"
    },
    {
        name: "Multigrain Bread",
        description: "Healthy bread made with seven different grains",
        price: 7.49,
        category: "Breads",
        searchTerm: "multigrain bread"
    },
    {
        name: "Black Forest Cake",
        description: "German chocolate cake with cherries and whipped cream",
        price: 34.99,
        category: "Cakes",
        searchTerm: "black forest cake"
    },
    {
        name: "Éclair",
        description: "Choux pastry filled with cream and topped with chocolate",
        price: 4.99,
        category: "Pastries",
        searchTerm: "éclair"
    },
    {
        name: "Olive Bread",
        description: "Mediterranean-style bread with kalamata olives",
        price: 6.99,
        category: "Breads",
        searchTerm: "olive bread"
    },
    {
        name: "Lemon Tart",
        description: "Tangy lemon curd in a buttery pastry shell",
        price: 5.49,
        category: "Pastries",
        searchTerm: "lemon tart"
    },
    {
        name: "Opera Cake",
        description: "French almond sponge cake with coffee and chocolate layers",
        price: 36.99,
        category: "Cakes",
        searchTerm: "opera cake"
    },
    {
        name: "Pretzel",
        description: "Traditional German-style soft pretzel with salt",
        price: 3.99,
        category: "Breads",
        searchTerm: "pretzel"
    },
    {
        name: "Mille-feuille",
        description: "Layers of puff pastry with vanilla cream and berries",
        price: 5.99,
        category: "Pastries",
        searchTerm: "mille-feuille"
    },
    {
        name: "Cheesecake",
        description: "New York style cheesecake with graham cracker crust",
        price: 29.99,
        category: "Cakes",
        searchTerm: "cheesecake"
    },
    {
        name: "Ciabatta",
        description: "Italian white bread with a crispy crust",
        price: 4.99,
        category: "Breads",
        searchTerm: "ciabatta"
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-cart', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing products
        await Product.deleteMany({});

        // Fetch images and create products
        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                const image = await getBakeryImage(product.searchTerm);
                return { ...product, image };
            })
        );

        // Insert products with images
        await Product.insertMany(productsWithImages);
        
        console.log('Products seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}


seedProducts(); 