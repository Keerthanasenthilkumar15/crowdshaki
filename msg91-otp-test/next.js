const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// ✅ Route to send OTP
app.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;

  try {
    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        template_id: "690c27d4f9159704d6047a64", // 🔹 your approved template ID
        mobile: mobile, // example: "919876543210"
        otp_length: "6",
      },
      {
        headers: {
          authkey: "YOUR_AUTH_KEY", // 🔹 replace with your MSG91 Auth Key
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
