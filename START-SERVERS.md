# Quick Start Instructions

## Step 1: Setup Database

You need to set up the MySQL database first. Choose one option:

### Option A: Using MySQL Command Line
```bash
mysql -u root -p < setup-database.sql
```
Enter your MySQL root password when prompted.

### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Open the file `setup-database.sql`
4. Execute the script

## Step 2: Configure Database Password

Edit `backend/.env` file and set your MySQL password:
```
DB_PASSWORD=your_mysql_password_here
```

## Step 3: Start Backend Server

Open a terminal and run:
```bash
cd backend
npm run dev
```

Backend will run on http://localhost:5000

## Step 4: Start Frontend Server

Open another terminal and run:
```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173

## Step 5: Open Application

Open your browser and go to: http://localhost:5173

Enjoy your Parking Lot Management System! 🚗
