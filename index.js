const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));




// Import middleware
const authMiddleware = require('./middleware/authMiddleware');
app.use(express.json()); 
app.use(cors()); 
app.use(express.urlencoded({ extended: true })); 




// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const companyRoutes = require('./routes/companyRoutes');
const studentRoutes = require('./routes/studentRoutes'); 
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const jobPostingRoutes = require('./routes/jobPostingRoutes');
const placementDriveRoutes = require('./routes/placementDriveRoutes');
const recruitmentStatusRoutes = require('./routes/recruitmentStatusRoutes');
const reportRoutes = require('./routes/reportRoutes');





// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/jobs', jobPostingRoutes); 
app.use('/api/placement-drives', placementDriveRoutes);
app.use('/api/reports', reportRoutes);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/company', companyRoutes);




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection failed:', error));




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
