const WaterData = require('../models/WaterData');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: './.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getAreas = async (req, res) => {
  try {
    const areas = await WaterData.distinct('areaName');
    res.json(areas.map(name => ({ name })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWaterQualityData = async (req, res) => {
  try {
    const { area } = req.params;
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    let data = await WaterData.findOne({
      areaName: area,
      date: { $gte: startOfToday },
    }).sort({ date: -1 });

    if (!data) {
      data = await WaterData.findOne({ areaName: area }).sort({
        date: -1,
      });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWeeklyWaterQualityData = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const data = await WaterData.find({
      areaName: req.params.area,
      date: { $gte: sevenDaysAgo, $lte: today },
    }).sort({ date: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMonthlyWaterQualityData = async (req, res) => {
  try {
    const today = new Date();
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(today.getDate() - 90);

    const data = await WaterData.find({
      areaName: req.params.area,
      date: { $gte: ninetyDaysAgo, $lte: today },
    }).sort({ date: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAIAssessment = async (req, res) => {
  try {
    const { area } = req.params;

    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const data = await WaterData.find({
      areaName: area,
      date: { $gte: sevenDaysAgo, $lte: today },
    }).sort({ date: 1 });

    if (!data || data.length === 0) {
      return res.json({ assessment: 'No recent data available to generate an assessment.' });
    }

    const prompt = `
      Analyze the following water quality data for ${area} from the past 7 days and provide a concise assessment (2-3 sentences).
      Focus on the overall quality, any significant negative trends, and whether the water is safe.
      Data:
      ${JSON.stringify(data, null, 2)}
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const assessment = await response.text();

    res.json({ assessment });
  } catch (error) {
    console.error('Error in getAIAssessment:', error);
    res.status(500).json({ message: 'Failed to generate AI assessment.', error: error.message });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    // Manual message instead of AI-generated alerts
    const alerts = [
      {
        areaName: 'All Areas',
        message: 'No critical water quality issues detected at the moment. All systems are functioning normally.',
        date: new Date(),
        severity: 'Good',
      }
    ];
    res.json(alerts);
  } catch (error) {
    console.error('Error generating alerts:', error);
    res.status(500).json({ message: 'Failed to generate alerts.', error: error.message });
  }
};
