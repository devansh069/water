const express = require('express');
const router = express.Router();
const {
  getAreas,
  getWaterQualityData,
  getWeeklyWaterQualityData,
  getMonthlyWaterQualityData,
  getAIAssessment,
  getAlerts,
} = require('../controllers/waterQualityController');

router.get('/areas', getAreas);
router.get('/water-quality/:area', getWaterQualityData);
router.get('/water-quality/:area/weekly', getWeeklyWaterQualityData);
router.get('/water-quality/:area/monthly', getMonthlyWaterQualityData);
router.get('/ai-assessment/:area', getAIAssessment);
router.get('/alerts', getAlerts);

module.exports = router;
