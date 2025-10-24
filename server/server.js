import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import memberRoutes from './src/routes/member.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import projectRoutes from './src/routes/project.routes.js';
import eventRoutes from './src/routes/event.routes.js';
import reportRoutes from './src/routes/report.routes.js';

import connectDB from './src/config/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS configuration - important for Vercel
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection
connectDB(process.env.MONGO_URI);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'SDS Portal API is running',
    status: 'active'
  });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API endpoint is working' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Local development server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;