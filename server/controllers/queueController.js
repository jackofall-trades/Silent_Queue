const Queue = require('../models/Queue');

// Create a new queue entry (Patient joins queue)
exports.createQueue = async (req, res) => {
  try {
    const queue = await Queue.create({ patient: req.user._id });
    res.status(201).json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all queue entries (Admin/Staff)
exports.getAllQueues = async (req, res) => {
  try {
    const queues = await Queue.find().populate('patient assignedStaff', 'firstName lastName role');
    res.json(queues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get my queue status (Patient)
exports.getMyQueue = async (req, res) => {
  try {
    const queue = await Queue.findOne({ patient: req.user._id }).populate('assignedStaff', 'firstName lastName');
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign staff to a queue entry (Staff/Admin)
exports.assignStaff = async (req, res) => {
  try {
    const { queueId, staffId } = req.body;
    const queue = await Queue.findByIdAndUpdate(queueId, { assignedStaff: staffId, status: 'in-progress' }, { new: true });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update queue status (Staff/Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { queueId, status } = req.body;
    const queue = await Queue.findByIdAndUpdate(queueId, { status }, { new: true });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};