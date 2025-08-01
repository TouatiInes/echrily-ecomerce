const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authenticateUser } = require('../middleware/auth');

// Get user's cart
router.get('/', authenticateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { user: req.user._id, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add item to cart
router.post('/add', authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update item quantity
router.put('/update', authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    const item = cart.items.find(item => item.product.equals(productId));
    if (!item) return res.status(404).json({ error: 'Product not in cart' });
    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove', authenticateUser, async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items = cart.items.filter(item => !item.product.equals(productId));
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
