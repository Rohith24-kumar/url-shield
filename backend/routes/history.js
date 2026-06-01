const express = require('express');
const ScanResult = require('../models/ScanResult');

const router = express.Router();

// ─── GET /api/history ─────────────────────────────────────────────────────────
// Returns all past scan results, newest first, limited to 50 records.
router.get('/', async (req, res) => {
  try {
    const history = await ScanResult.find()
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    res.json(history);
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

// ─── DELETE /api/history ──────────────────────────────────────────────────────
// Deletes all scan records from the database.
router.delete('/', async (req, res) => {
  try {
    await ScanResult.deleteMany({});
    res.json({ message: 'History cleared successfully' });
  } catch (err) {
    console.error('History delete error:', err);
    res.status(500).json({ error: 'Could not clear history' });
  }
});
// ─── GET /api/history/stats ───────────────────────────────────────────────────
// Returns count of each verdict type for dashboard charts.
router.get('/stats', async (req, res) => {
  try {
    const stats = await ScanResult.aggregate([
      {
        $group: {
          _id: '$verdict',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    console.error('Stats fetch error:', err);
    res.status(500).json({ error: 'Could not fetch stats' });
  }
});
module.exports = router;
