# Multi-Duration Timer (MERN Stack)

## Features
- Select between 5s, 10s, and 60s timers
- Play, Stop, and Reset controls
- Dynamic countdown display
- Optional MongoDB persistence

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/yourusername/multi-duration-timer.git
cd multi-duration-timer

### 2. Install dependencies
cd backend
npm install

cd ../frontend
npm install

### 3. Build frontend
npm run build

### 4. Run the app
cd ../backend
npm start

### 5. Optional: MongoDB
- Add .env with MONGO_URI
- Uncomment MongoDB logic in server.js

## Tech Stack
- React.js
- Node.js
- Express.js
- MongoDB (optional)
