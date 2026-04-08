const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Database configuration with SSL support for cloud databases
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'parking_lot',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Add SSL configuration for production (PlanetScale, Railway, Aiven, etc.)
if (process.env.DB_SSL === 'true') {
  dbConfig.ssl = {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
  };
}

// Create connection pool for better performance
const pool = mysql.createPool(dbConfig);

// Get promise-based pool
const promisePool = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    if (process.env.NODE_ENV === 'production') {
      console.error('⚠️  Check your database credentials and SSL settings');
    }
    return;
  }
  console.log('✅ Database connected successfully');
  console.log(`📊 Connected to: ${process.env.DB_HOST || 'localhost'}`);
  connection.release();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing database connections');
  pool.end((err) => {
    if (err) {
      console.error('Error closing database pool:', err);
    } else {
      console.log('Database pool closed');
    }
    process.exit(err ? 1 : 0);
  });
});

module.exports = promisePool;
