import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import memberRoutes from './src/routes/member.routes.js';
// import authRoutes from './src/routes/auth.routes.js';
// import userRoutes from './src/routes/user.routes.js'; 
import projectRoutes from './src/routes/project.routes.js';
// import eventRoutes from './src/routes/event.routes.js';
// import reportRoutes from './src/routes/report.routes.js';
// import adminRoutes from './src/routes/admin.routes.js';
// import facultyRoutes from './src/routes/faculty.routes.js';
import connectDB from './src/config/db.js';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mongo connect
connectDB(process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cors());

//Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/projects', projectRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/faculty', facultyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});