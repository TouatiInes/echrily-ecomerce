const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const connectDB = require('../config/database');

// Load environment variables
dotenv.config();

// Sample data
const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@shopease.com',
    password: 'Admin123!',
    role: 'admin',
    isEmailVerified: true
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'User123!',
    role: 'user',
    isEmailVerified: true
  }
];

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 99.99,
    originalPrice: 129.99,
    category: 'Electronics',
    brand: 'AudioTech',
    sku: 'AT-WH-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        alt: 'Wireless Bluetooth Headphones',
        isPrimary: true
      }
    ],
    features: ['Noise Cancellation', '30-hour Battery', 'Bluetooth 5.0', 'Quick Charge'],
    inventory: { quantity: 50, lowStockThreshold: 10 },
    isFeatured: true,
    tags: ['wireless', 'bluetooth', 'headphones', 'audio']
  },
  {
    name: 'Smart Watch Series 8',
    description: 'Advanced smartwatch with health monitoring, GPS, and cellular connectivity. Track your fitness and stay connected.',
    price: 399.99,
    originalPrice: 449.99,
    category: 'Electronics',
    brand: 'TechWatch',
    sku: 'TW-SW-008',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        alt: 'Smart Watch Series 8',
        isPrimary: true
      }
    ],
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Cellular Connectivity'],
    inventory: { quantity: 30, lowStockThreshold: 5 },
    isFeatured: true,
    tags: ['smartwatch', 'fitness', 'health', 'gps']
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
    price: 24.99,
    category: 'Fashion',
    brand: 'EcoWear',
    sku: 'EW-TS-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        alt: 'Organic Cotton T-Shirt',
        isPrimary: true
      }
    ],
    features: ['100% Organic Cotton', 'Machine Washable', 'Multiple Colors', 'Sustainable'],
    inventory: { quantity: 100, lowStockThreshold: 20 },
    tags: ['organic', 'cotton', 'tshirt', 'sustainable']
  },
  {
    name: 'Ceramic Plant Pot Set',
    description: 'Beautiful set of 3 ceramic plant pots with drainage holes. Perfect for indoor plants and herbs.',
    price: 34.99,
    category: 'Home & Garden',
    brand: 'GreenHome',
    sku: 'GH-PP-003',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
        alt: 'Ceramic Plant Pot Set',
        isPrimary: true
      }
    ],
    features: ['Set of 3', 'Drainage Holes', 'Ceramic Material', 'Indoor/Outdoor Use'],
    inventory: { quantity: 25, lowStockThreshold: 5 },
    tags: ['ceramic', 'plant', 'pot', 'garden', 'home']
  },
  {
    name: 'Yoga Mat Premium',
    description: 'High-quality non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and fitness.',
    price: 49.99,
    category: 'Sports',
    brand: 'ZenFit',
    sku: 'ZF-YM-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
        alt: 'Yoga Mat Premium',
        isPrimary: true
      }
    ],
    features: ['Non-slip Surface', 'Eco-friendly', '6mm Thickness', 'Carrying Strap'],
    inventory: { quantity: 40, lowStockThreshold: 8 },
    tags: ['yoga', 'mat', 'fitness', 'exercise', 'eco-friendly']
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 19.99,
    category: 'Sports',
    brand: 'HydroSteel',
    sku: 'HS-WB-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
        alt: 'Stainless Steel Water Bottle',
        isPrimary: true
      }
    ],
    features: ['Double Wall Insulation', 'BPA Free', 'Leak Proof', '500ml Capacity'],
    inventory: { quantity: 75, lowStockThreshold: 15 },
    isFeatured: true,
    tags: ['water', 'bottle', 'stainless', 'insulated', 'sports']
  },
  {
    name: 'LED Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
    price: 59.99,
    category: 'Electronics',
    brand: 'BrightDesk',
    sku: 'BD-DL-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
        alt: 'LED Desk Lamp',
        isPrimary: true
      }
    ],
    features: ['Adjustable Brightness', 'Color Temperature Control', 'USB Charging Port', 'Touch Control'],
    inventory: { quantity: 35, lowStockThreshold: 7 },
    tags: ['led', 'desk', 'lamp', 'adjustable', 'usb']
  },
  {
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 29.99,
    category: 'Electronics',
    brand: 'ChargeTech',
    sku: 'CT-WC-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1609592806596-4d8b5e0e7e0c?w=500&h=500&fit=crop',
        alt: 'Wireless Phone Charger',
        isPrimary: true
      }
    ],
    features: ['Fast Charging', 'Qi Compatible', 'LED Indicator', 'Non-slip Base'],
    inventory: { quantity: 60, lowStockThreshold: 12 },
    tags: ['wireless', 'charger', 'phone', 'qi', 'fast']
  }
];

// Connect to database and seed data
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user first
    console.log('Creating users...');
    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find(user => user.role === 'admin');

    // Add createdBy field to products
    const productsWithCreator = products.map(product => ({
      ...product,
      createdBy: adminUser._id
    }));

    // Create products
    console.log('Creating products...');
    await Product.create(productsWithCreator);

    console.log('✅ Data seeded successfully!');
    console.log(`📊 Created ${createdUsers.length} users and ${productsWithCreator.length} products`);
    console.log('🔐 Admin credentials: admin@shopease.com / Admin123!');
    console.log('👤 User credentials: john@example.com / User123!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeder
if (require.main === module) {
  seedData();
}

module.exports = { seedData };
