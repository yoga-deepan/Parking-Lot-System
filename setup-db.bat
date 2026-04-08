@echo off
echo ========================================
echo Parking Lot Database Setup
echo ========================================
echo.
echo Please enter your MySQL root password when prompted
echo.
pause

mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS parking_lot; USE parking_lot; CREATE TABLE IF NOT EXISTS parking_records (id INT AUTO_INCREMENT PRIMARY KEY, ticket_id VARCHAR(36) UNIQUE NOT NULL, vehicle_number VARCHAR(20) NOT NULL, vehicle_type ENUM('Bike', 'Car', 'Truck') NOT NULL, entry_time DATETIME NOT NULL, exit_time DATETIME DEFAULT NULL, amount DECIMAL(10, 2) DEFAULT NULL, status ENUM('PARKED', 'EXITED') DEFAULT 'PARKED', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX idx_status (status), INDEX idx_ticket (ticket_id), INDEX idx_vehicle_number (vehicle_number)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Database setup completed successfully!
    echo ========================================
    echo.
    echo Now update backend/.env with your MySQL password
    echo Then restart the backend server
) else (
    echo.
    echo ========================================
    echo Database setup failed!
    echo ========================================
    echo Please check your MySQL password and try again
)

echo.
pause
