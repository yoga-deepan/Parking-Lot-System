# 🚀 Simple Setup Instructions

## The database hasn't been created yet. Here are 3 easy ways to fix this:

---

## ✅ METHOD 1: MySQL Workbench (EASIEST)

1. Open **MySQL Workbench**
2. Connect to your local MySQL server (enter your password)
3. Click **File** → **Open SQL Script**
4. Select the file: `database.sql`
5. Click the **Execute** button (⚡ lightning icon)
6. Done! ✅

---

## ✅ METHOD 2: MySQL Command Line

1. Open **Command Prompt** (not PowerShell)
2. Navigate to project:
   ```
   cd "D:\My Projects\Park"
   ```
3. Run:
   ```
   mysql -u root -p < database.sql
   ```
4. Enter your MySQL password when prompted
5. Done! ✅

---

## ✅ METHOD 3: Manual SQL Commands

1. Open MySQL Workbench or Command Line
2. Login to MySQL
3. Copy and paste this:

```sql
CREATE DATABASE IF NOT EXISTS parking_lot;
USE parking_lot;

CREATE TABLE IF NOT EXISTS parking_records (
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

4. Execute it
5. Done! ✅

---

## 📝 After Database is Created:

1. **Update backend/.env** with your MySQL password:
   ```
   DB_PASSWORD=your_mysql_password
   ```

2. **The backend will auto-restart** (nodemon is watching)

3. **Refresh your browser** at http://localhost:5173

4. **You should see the dashboard** with parking slots! 🎉

---

## 🔍 Current Status:

- ✅ Frontend: Running on http://localhost:5173
- ✅ Backend: Running on http://localhost:5000
- ❌ Database: Not created yet (that's why you see the error)

Once you create the database using any method above, everything will work!
