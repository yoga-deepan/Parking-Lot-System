Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Parking Lot Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$password = Read-Host "Enter your MySQL root password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host "Creating database..." -ForegroundColor Yellow

$sqlCommand = @"
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
"@

if ($plainPassword -eq "") {
    mysql -u root -e $sqlCommand 2>&1 | Out-Null
} else {
    mysql -u root -p"$plainPassword" -e $sqlCommand 2>&1 | Out-Null
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Database setup completed successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now update backend/.env with your MySQL password" -ForegroundColor Yellow
    Write-Host "The backend server will automatically reconnect" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Database setup failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Please check your MySQL password and try again" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to continue"
