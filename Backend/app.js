const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const requestLogger = require('./utilities/requestLogger');
const errorLogger = require('./utilities/errorLogger');
const connectDB = require('./config/db');

const vendorRoutes = require('./routes/vendorRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

//Request Logger
app.use(requestLogger);

// Routes
app.use('/api/v1', vendorRoutes);
app.use('/api/v1', customerRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v1', reviewRoutes);

//Image Route
app.use('/images', express.static(path.join(__dirname,'images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  if (! req.file) {
    res.json({"error": "No file uploaded"});
  }
  const imageUrl = `http://localhost:3000/images/${req.file.filename}`;
  res.json({ imageUrl });
});

//Error Logger
app.use(errorLogger);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});