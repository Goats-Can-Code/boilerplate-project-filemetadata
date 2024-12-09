const express = require("express");
const cors = require("cors");
const multer = require("multer"); // File upload middleware
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" }); // Files will be uploaded to the 'uploads' directory

// API Endpoint for File Upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
