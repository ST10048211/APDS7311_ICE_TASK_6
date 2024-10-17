const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/authRoutes'));

// SSL certificate and key paths
const privateKey = fs.readFileSync(path.join(__dirname, 'Keys', 'privatekey.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'Keys', 'certificate.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// HTTPS server setup
const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 5000;

httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
