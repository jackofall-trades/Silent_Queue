const express = require('express');
const {
  createQueue,
  getAllQueues,
  getMyQueue,
  assignStaff,
  updateStatus,
} = require('../controllers/queueController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createQueue); // Patient joins queue
router.get('/all', protect, getAllQueues); // Admin/Staff view all queues
router.get('/my', protect, getMyQueue); // Patient views their queue
router.put('/assign', protect, assignStaff); // Assign staff
router.put('/status', protect, updateStatus); // Update status

module.exports = router;