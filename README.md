# Smart Sales & Customer Analytics Dashboard

A comprehensive web application for managing sales data, customer information, and generating interactive dashboards for business decision-making.

## Features

### 🔐 User Management
- **Role-based Authentication**: Admin, Employee, and Manager roles
- **Secure Login System**: JWT-based authentication
- **Demo Accounts**: Pre-configured accounts for testing

### 👥 Customer Management
- **Customer Database**: Add, edit, delete, and view customer records
- **Customer Information**: Name, email, phone, company, city, and status
- **Customer Analytics**: Total spent, order count, and customer segments

### 💰 Sales Management
- **Sales Transactions**: Complete CRUD operations for sales records
- **Product Catalog**: Pre-defined product list with pricing
- **Import/Export**: CSV support for bulk data operations
- **Sales Tracking**: Status tracking (completed/pending)

### 📊 Data Visualization
- **Interactive Dashboards**: Real-time KPIs and metrics
- **Revenue Trends**: Monthly and daily revenue charts
- **Product Performance**: Top products by revenue
- **Customer Segmentation**: High, medium, and low-value customers
- **Sales Analytics**: Comprehensive analytics with time filtering

### 📈 Analytics & Reporting
- **Real-time Metrics**: Total revenue, customers, sales, and average order value
- **Time-based Filtering**: 7 days, 30 days, 90 days, and 1 year views
- **Interactive Charts**: Line charts, bar charts, pie charts, and area charts
- **Export Capabilities**: CSV export for all data

## Technology Stack

### Frontend
- **React.js 18**: Modern, component-based UI
- **Tailwind CSS**: Responsive design and styling
- **Recharts**: Interactive charts and data visualization
- **React Router**: Client-side routing
- **React Hook Form**: Form management
- **React Hot Toast**: User notifications
- **Lucide React**: Modern icon library

### Data Management
- **Context API**: State management for authentication and data
- **Mock Data Generator**: Realistic sample data for demonstration
- **Local Storage**: Persistent authentication state

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| Employee | employee@company.com | employee123 |
| Manager | manager@company.com | manager123 |

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone [YOUR_GITHUB_REPO_URL]
   cd smart-sales-dashboard
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Start the application**
   
   **Windows Users (Easiest):**
   - Double-click `start.bat`
   - Wait for both servers to start
   - Browser will open automatically
   
   **Manual Start:**
   ```bash
   # Terminal 1 - Start Backend Server
   cd server
   node server.js
   
   # Terminal 2 - Start Frontend Server (open new terminal)
   npm start
   ```

4. **Access the application**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000

### 📋 Alternative Installation Methods

**Using the Installation Guide:**
- Read `INSTALLATION_GUIDE.md` for detailed step-by-step instructions
- Check `requirements.txt` for all dependencies

**Using Start Scripts:**
- **Windows:** Double-click `start.bat`
- **Mac/Linux:** Run `./start.sh` in terminal

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Project Structure

```
src/
├── components/          # React components
│   ├── Login.js        # Authentication component
│   ├── Layout.js       # Main layout with navigation
│   ├── Dashboard.js    # Main dashboard with KPIs
│   ├── Customers.js    # Customer management
│   ├── Sales.js        # Sales management
│   └── Analytics.js    # Advanced analytics
├── contexts/           # React contexts for state management
│   ├── AuthContext.js  # Authentication state
│   └── DataContext.js  # Application data state
├── utils/              # Utility functions
│   └── mockData.js     # Mock data generator
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles with Tailwind
```

## Key Features Explained

### 1. Authentication System
- Secure login with role-based access control
- Persistent sessions using localStorage
- Protected routes for authenticated users only

### 2. Customer Management
- Complete CRUD operations for customer data
- Search and filter functionality
- Customer status tracking (active/inactive)
- Customer analytics and spending insights

### 3. Sales Management
- Sales transaction management
- Product selection from predefined catalog
- Quantity and pricing calculations
- CSV import/export functionality
- Sales status tracking

### 4. Dashboard & Analytics
- Real-time KPI display
- Interactive charts and graphs
- Time-based data filtering
- Revenue trend analysis
- Product performance metrics
- Customer segmentation insights

### 5. Data Visualization
- **Line Charts**: Revenue trends over time
- **Bar Charts**: Product performance comparison
- **Pie Charts**: Customer segments and sales status
- **Area Charts**: Revenue growth visualization
- **Responsive Design**: Works on all device sizes

## Mock Data

The application includes comprehensive mock data:
- **20 Customers**: Realistic customer profiles with contact information
- **150 Sales Records**: Sales transactions across different products
- **10 Products**: Technology products with varying price points
- **Time-based Data**: Sales spread across the last 90 days

## Customization

### Adding New Products
Edit the `products` array in `src/utils/mockData.js`:

```javascript
const products = [
  'Your New Product',
  // ... existing products
];
```

### Modifying User Roles
Update the mock users in `src/contexts/AuthContext.js`:

```javascript
const mockUsers = [
  { id: 1, email: 'your@email.com', password: 'password', role: 'admin', name: 'Your Name' },
  // ... existing users
];
```

### Styling Customization
Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Charts**: Efficient rendering with Recharts
- **Responsive Images**: Optimized for different screen sizes
- **Fast Navigation**: Client-side routing for instant page changes

## Security Features

- **Input Validation**: All forms include proper validation
- **XSS Protection**: React's built-in XSS protection
- **Secure Authentication**: JWT-based authentication system
- **Role-based Access**: Different permissions for different user types

## Future Enhancements

Potential features for future development:
- Real-time notifications
- Advanced reporting with PDF export
- Email integration
- Mobile app version
- Advanced user management
- API integration with external services
- Data backup and restore functionality

## Support

For questions or issues:
1. Check the demo accounts to ensure proper login
2. Verify all dependencies are installed correctly
3. Ensure you're using a modern browser
4. Check the browser console for any error messages

## License

This project is created for educational and demonstration purposes.

