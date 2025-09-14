#!/bin/bash

echo "========================================"
echo "  Smart Sales Dashboard - Quick Start"
echo "========================================"
echo

echo "Installing frontend dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Frontend dependencies installation failed!"
    echo "Please check your Node.js installation."
    exit 1
fi

echo
echo "Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "Backend dependencies installation failed!"
    echo "Please check your Node.js installation."
    exit 1
fi

echo
echo "Starting backend server..."
npm start &
BACKEND_PID=$!

echo
echo "Waiting for backend to start..."
sleep 3

echo
echo "Starting frontend development server..."
cd ..
npm start &
FRONTEND_PID=$!

echo
echo "========================================"
echo "Smart Sales Dashboard is starting up!"
echo "========================================"
echo
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo
echo "Demo Accounts:"
echo "- Admin: admin@company.com / admin123"
echo "- Employee: employee@company.com / employee123"
echo "- Manager: manager@company.com / manager123"
echo
echo "The application will open in your browser automatically."
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait