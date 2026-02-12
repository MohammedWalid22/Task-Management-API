const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Import Routes & Middleware
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const healthRoutes = require('./routes/healthRoutes');
const globalErrorHandler = require('./middleware/errorMiddleware');
const sanitizeMiddleware = require('./middleware/sanitizeMiddleware');
const AppError = require('./utils/AppError'); // أو المسار الصحيح للملف

const app = express();

// 1. GLOBAL SECURITY MIDDLEWARES

// Enable Trust Proxy (for reverse proxies like Nginx)
app.enable('trust proxy');

// CORS Configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000',
  credentials: true
}));

// Helmet Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  },
  frameguard: { action: 'deny' },
}));
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));

// Rate Limiting
const generalLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', generalLimiter);

const loginLimiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
  message: 'Too many login attempts. Please try again after an hour.'
});
app.use('/api/v1/auth/login', loginLimiter);

// Body Parser & Cookies
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data Sanitization
app.use(xss());
app.use(hpp());
app.use(sanitizeMiddleware); // Custom sanitizer

// ETag for Caching
app.set('etag', 'strong');

// 2. ROUTES
app.use('/', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// 3. ERROR HANDLING
// Handle 404
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;