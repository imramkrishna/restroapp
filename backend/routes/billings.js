const express = require('express');
const router = express.Router();
const Billing = require('../models/Billing');

// Save billing data
router.post('/', async (req, res) => {
  const { table, items, totalPrice } = req.body;

  const billing = new Billing({
    table,
    items,
    totalPrice,
  });

  try {
    await billing.save();
    res.status(201).json(billing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;