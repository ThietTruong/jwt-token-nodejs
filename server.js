const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;
const {
  signAccessToken,
  signRefreshToken,
  verifyToken,
  refreshToken,
} = require("./init_iwt");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/login", async (req, res) => {
  return res.status(200).json({
    status: "success",
    element: {
      accessToken: await signAccessToken(),
      refreshToken: await signRefreshToken(),
    },
  });
});

app.get("/api/user", verifyToken, (req, res) => {
  return res.status(200).json({
    status: "success",
    user: {
      name: "Thiet Truong",
      age: 21,
      address: "HCMC",
      email: "tA0l6@example.com",
      phone: "0123456789",
      gender: "male",
      avatar: "https://i.pravatar.cc/300",
      role: "admin",
    },
  });
});

app.get("/api/refreshToken", async (req, res) => {
  return res.status(200).json({
    status: "success",
    element: {
      accessToken: await signAccessToken(),
      refreshToken: await signRefreshToken(),
    },
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
