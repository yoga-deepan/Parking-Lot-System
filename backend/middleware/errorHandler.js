// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log error details in production
  console.error('❌ Error occurred:', {
    message: err.message,
    code: err.code,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Log stack trace only in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack trace:', err.stack);
  }

  // Database errors
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      success: false,
      error: 'Duplicate entry',
      message: 'This record already exists'
    });
  }

  if (err.code === 'ECONNREFUSED' || err.code === 'PROTOCOL_CONNECTION_LOST') {
    return res.status(503).json({
      success: false,
      error: 'Database connection failed',
      message: 'Unable to connect to database. Please try again later.'
    });
  }

  if (err.code === 'ER_NO_SUCH_TABLE') {
    return res.status(500).json({
      success: false,
      error: 'Database configuration error',
      message: 'Database tables not found. Please run database setup.'
    });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      message: err.message
    });
  }

  // JWT/Auth errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token'
    });
  }

  // Default error response
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : message,
    message: statusCode === 500 ? 'Something went wrong. Please try again later.' : message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err 
    })
  });
};

module.exports = errorHandler;
