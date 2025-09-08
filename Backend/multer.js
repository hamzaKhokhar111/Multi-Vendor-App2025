const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // agar folder exist nahi hai to bana lo
}

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Backend/uploads folder me save karega
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // file extension (.jpg, .png)
    const baseName = path.basename(file.originalname, ext); // filename without extension
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

// ✅ Upload middleware export
const upload = multer({ storage });

module.exports = { upload };
