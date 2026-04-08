# 🚗 Parking Lot Setup Guide

## Current Status:
- ✅ Frontend is running on http://localhost:5173
- ✅ Backend is running on http://localhost:5000
- ❌ Database connection failed - needs setup

## Fix the Database Connection:

### Step 1: Run Database Setup

**Option A - Using the batch file (Easiest):**
```bash
setup-db.bat
```
Enter your MySQL root password when prompted.

**Option B - Manual MySQL setup:**
1. Open MySQL Workbench or MySQL Command Line
2. Login with your root credentials
3. Run these commands:
```sql
CREATE DATABASE IF NOT EXISTS parking_lot;
USE parking_lot;

CREATE TABLE parking_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(36) UNIQUE NOT NULL,
    vehicle_number VARCHAR(20) NOT NULL,
    vehicle_type ENUM('Bike', 'Car', 'Truck') NOT NULL,
    entry_time DATETIME NOT NULL,
    exit_time DATETIME DEFAULT NULL,
    amount DECIMAL(10, 2) DEFAULT NULL,
    status ENUM('PARKED', 'EXITED') DEFAULT 'PARKED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_ticket (ticket_id),
    INDEX idx_vehicle_number (vehicle_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Step 2: Update Database Password

Edit `backend/.env` file and add your MySQL password:
```
DB_PASSWORD=your_mysql_password_here
```

### Step 3: Restart Backend

The backend server will automatically detect the changes and reconnect.
If not, you can restart it manually.

### Step 4: Refresh Browser

Go to http://localhost:5173 and click the "Retry" button or refresh the page.

## Troubleshooting:

**If you don't know your MySQL password:**
- You may have set it during MySQL installation
- Try leaving it blank (empty string) in .env
- Or reset it using MySQL documentation

**If database still doesn't connect:**
1. Check MySQL service is running
2. Verify credentials in backend/.env
3. Check backend terminal for error messages

## Quick Test:

Once setup is complete, you should see:
- Dashboard with available slots (5 Bike, 5 Car, 2 Truck)
- Ability to park vehicles
- Ability to exit vehicles and calculate charges

Need help? Check the backend terminal for detailed error messages.
