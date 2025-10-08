const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth.routes.js');
const userRoutes = require('./src/routes/user.routes.js');
const projectRoutes = require('./src/routes/project.routes.js');
const eventRoutes = require('./src/routes/event.routes.js');
const reportRoutes = require('./src/routes/report.routes.js');
const adminRoutes = require('./src/routes/admin.routes.js');
const facultyRoutes = require('./src/routes/faculty.routes.js');
const connectDB = require('./src/config/db.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Mongo connect
connectDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});