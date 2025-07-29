const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getAllOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, validateOrder, createOrder);

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', protect, getUserOrders);

// @route   GET /api/orders/admin/all
// @desc    Get all orders (Admin)
// @access  Private/Admin
router.get('/admin/all', protect, admin, getAllOrders);

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, getOrder);

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', protect, admin, updateOrderStatus);

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order
// @access  Private
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
