require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`;
    const response = await axios.get(url);

    res.json({
      success: true,
      result: response.data.conversion_result,
      rate: response.data.conversion_rate
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
