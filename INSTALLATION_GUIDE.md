# 🚀 Smart Sales Dashboard - Installation Guide

## 📋 Prerequisites
Before running this application, make sure you have:
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)
- **A modern web browser** (Chrome, Firefox, Safari, Edge)

## 🎯 Quick Installation (3 Steps)

### Step 1: Clone or Download the Project
**Option A: Clone with Git**
```bash
git clone [YOUR_GITHUB_REPO_URL]
cd smart-sales-dashboard
```

**Option B: Download ZIP**
- Go to the GitHub repository
- Click "Code" → "Download ZIP"
- Extract the ZIP file to your desired location

### Step 2: Install Dependencies
Open Command Prompt (Windows) or Terminal (Mac/Linux) and run:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 3: Run the Application
**Windows Users (Easiest):**
- Double-click `start.bat` (if available)
- Wait for both servers to start
- Browser will open automatically

**Manual Start:**
```bash
# Terminal 1 - Start Backend Server
cd server
node server.js

# Terminal 2 - Start Frontend Server (open new terminal)
cd [project-directory]
npm start
```

## 🌐 Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🔑 Login Credentials
Use any of these demo accounts:
- **Admin:** admin@company.com / admin123
- **Employee:** employee@company.com / employee123
- **Manager:** manager@company.com / manager123

## 🎨 What You'll See
- **Beautiful Login Page** with modern design
- **Dashboard** with real-time analytics and charts
- **Customer Management** - Add, edit, delete customers
- **Sales Management** - Record sales, import/export CSV
- **Analytics** - Interactive charts and insights
- **Responsive Design** - Works on all devices

## 📊 Sample Data Included
The app comes with realistic mock data:
- **20 Customers** with contact information
- **150 Sales Records** across different products
- **10 Products** in the catalog
- **$50,000+** in total sales data

## 🛠️ Troubleshooting

### Common Issues:

**1. Port Already in Use**
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000
npx kill-port 5000
```

**2. Dependencies Installation Failed**
```bash
# Clear npm cache and try again
npm cache clean --force
npm install
```

**3. Backend Not Starting**
- Check if port 5000 is available
- Make sure you're in the server directory
- Try: `node server.js` instead of `npm start`

**4. Frontend Not Starting**
- Make sure you're in the root directory
- Try: `npm start` or `yarn start`

**5. Module Not Found Error**
- Ensure you're in the correct directory
- Run `npm install` in both root and server folders
- Check if all dependencies are installed

### Getting Help:
- Check the browser console for errors
- Verify both servers are running
- Read the full README.md for detailed documentation
- Check the requirements.txt file for all dependencies

## 🎯 Features to Explore

### Dashboard
- Real-time KPIs (Revenue, Customers, Sales, Avg Order Value)
- Interactive charts (Line, Bar, Pie, Area)
- Time-based filtering (7 days, 30 days, 90 days, 1 year)

### Customer Management
- Complete CRUD operations
- Search and filter functionality
- Customer analytics and spending insights
- Status tracking (Active/Inactive)

### Sales Management
- Sales transaction recording
- Product selection from catalog
- CSV import/export functionality
- Sales status tracking

### Analytics
- Revenue trend analysis
- Product performance metrics
- Customer segmentation
- Advanced data visualization

## 🚀 Production Deployment
For production deployment:
```bash
# Build the frontend
npm run build

# Use Docker (optional)
docker-compose up --build
```

## 📱 Mobile Support
The application is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎉 You're Ready!
Your Smart Sales Dashboard is now running with:
- Beautiful, modern UI
- Complete functionality
- Realistic sample data
- Professional code structure
- Ready for presentation or further development

**Happy exploring! 🚀**

---
*For technical support or questions, check the README.md file or contact the developer.*
