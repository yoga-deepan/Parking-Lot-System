# 🚗 Parking Lot Management System

A modern, full-stack web application for managing parking lot operations with real-time slot availability, automated billing, and a clean user interface.

![Parking Lot System](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v18-blue)
![MySQL](https://img.shields.io/badge/MySQL-v5.7+-orange)

## 📋 Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Pricing Logic](#pricing-logic)
- [Future Improvements](#future-improvements)

## ✨ Features

- **Real-time Slot Availability**: Live dashboard showing available parking slots
- **Vehicle Entry Management**: Park vehicles with automatic ticket generation
- **Automated Billing**: Calculate charges based on parking duration
- **Vehicle Exit Processing**: Process exits and generate payment receipts
- **Auto-refresh Dashboard**: Updates every 10 seconds
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern, professional interface with smooth animations

### Parking Capacity
- 🏍️ Bikes: 5 slots
- 🚗 Cars: 5 slots
- 🚚 Trucks: 2 slots

## 📸 Screenshots

### Dashboard - Available Slots
![Dashboard](./screenshots/dashboard.png)
*Real-time view of available parking slots with auto-refresh*

### Park Vehicle
![Park Vehicle](./screenshots/park-vehicle.png)
*Simple form to park a vehicle and receive a ticket ID*

### Exit Vehicle & Payment
![Exit Vehicle](./screenshots/exit-vehicle.png)
*Calculate parking charges and process vehicle exit*

> **Note**: Add screenshots to the `screenshots/` folder after running the application

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React (Vite)
- **Database**: MySQL
- **API**: REST

## Features

- Real-time parking slot availability (5 Bike, 5 Car, 2 Truck slots)
- Vehicle entry with unique ticket generation
- Automated billing based on parking duration
- Vehicle exit with payment calculation
- Clean, responsive UI

## 💰 Pricing Logic

The system calculates parking charges based on duration (rounded up to the nearest hour):

| Duration | Price |
|----------|-------|
| Up to 3 hours | ₹30 |
| 3-6 hours | ₹85 |
| Above 6 hours | ₹120 |

**Example**: If a vehicle is parked for 3 hours and 15 minutes, it will be charged for 4 hours (₹85).

## 📁 Project Structure

### 1. Database Setup

```sql
CREATE DATABASE parking_lot;
USE parking_lot;

CREATE TABLE parking_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(36) UNIQUE NOT NULL,
    vehicle_number VARCHAR(20) NOT NULL,
    vehicle_type ENUM('Bike', 'Car', 'Truck') NOT NULL,
    entry_time DATETIME NOT NULL,
    exit_time DATETIME,
    amount DECIMAL(10, 2),
    status ENUM('PARKED', 'EXITED') DEFAULT 'PARKED',
    INDEX idx_status (status),
    INDEX idx_ticket (ticket_id)
);
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=parking_lot
DB_PORT=3306
```

Start the backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Documentation

### GET /api/slots
Get available parking slots for each vehicle type.

**Response:**
```json
{
  "Bike": 3,
  "Car": 2,
  "Truck": 1
}
```

### POST /api/park
Park a vehicle.

**Request:**
```json
{
  "vehicle_number": "TN01AB1234",
  "vehicle_type": "Car"
}
```

**Response:**
```json
{
  "message": "Parked Successfully",
  "ticket_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### POST /api/exit
Exit a vehicle and calculate charges.

**Request:**
```json
{
  "ticket_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "message": "Exit Successful",
  "vehicle_number": "TN01AB1234",
  "vehicle_type": "Car",
  "hours": 4,
  "amount": 85
}
```

## Project Structure

```
parking-lot-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── parkingController.js
│   ├── models/
│   │   └── parkingModel.js
│   ├── routes/
│   │   └── parkingRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## License

MIT


## 🚀 Future Improvements

Here are some potential enhancements for the system:

### Features
- [ ] Search vehicle by number
- [ ] Parking history and reports
- [ ] Monthly pass system
- [ ] Email/SMS notifications for ticket
- [ ] Payment gateway integration
- [ ] Admin dashboard with analytics
- [ ] Vehicle type-based pricing
- [ ] Reserved parking slots
- [ ] QR code for tickets

### Technical
- [ ] User authentication (JWT)
- [ ] Rate limiting for APIs
- [ ] Caching with Redis
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Logging and monitoring
- [ ] Database migrations

### UI/UX
- [ ] Dark mode toggle
- [ ] Print receipt functionality
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG)
- [ ] Advanced animations

## 👨‍💻 Developer Notes

### Code Quality
- Clean, readable code with proper comments
- MVC architecture for backend
- Component-based architecture for frontend
- Error handling at all levels
- Input validation and sanitization

### Best Practices
- Environment variables for configuration
- Connection pooling for database
- Async/await for asynchronous operations
- RESTful API design
- Responsive CSS design

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 🤝 Contributing

This is a portfolio/learning project. Feel free to fork and customize for your needs!

## 📧 Contact

For questions or feedback, please open an issue in the repository.

---

**Made with ❤️ for learning and demonstration purposes**
