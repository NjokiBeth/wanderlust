const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the root directory
app.use(express.static(__dirname));

// Handle all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
