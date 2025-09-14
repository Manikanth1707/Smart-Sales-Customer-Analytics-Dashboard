import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Filter
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const Analytics = () => {
  const { getAnalyticsData, sales, customers } = useData();
  const [timeRange, setTimeRange] = useState('30');
  const analytics = getAnalyticsData();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Filter data based on time range
  const getFilteredData = () => {
    const days = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return {
      sales: sales.filter(sale => new Date(sale.createdAt) >= cutoffDate),
      customers: customers.filter(customer => new Date(customer.createdAt) >= cutoffDate)
    };
  };

  const filteredData = getFilteredData();

  // Calculate metrics for filtered data
  const filteredRevenue = filteredData.sales.reduce((sum, sale) => sum + sale.amount, 0);
  const filteredSalesCount = filteredData.sales.length;
  const filteredCustomersCount = filteredData.customers.length;
  const avgOrderValue = filteredSalesCount > 0 ? filteredRevenue / filteredSalesCount : 0;

  // Daily revenue data
  const dailyRevenue = {};
  filteredData.sales.forEach(sale => {
    const date = new Date(sale.createdAt).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    dailyRevenue[date] = (dailyRevenue[date] || 0) + sale.amount;
  });

  const dailyData = Object.entries(dailyRevenue)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Product performance
  const productPerformance = {};
  filteredData.sales.forEach(sale => {
    if (!productPerformance[sale.product]) {
      productPerformance[sale.product] = { revenue: 0, quantity: 0, orders: 0 };
    }
    productPerformance[sale.product].revenue += sale.amount;
    productPerformance[sale.product].quantity += sale.quantity;
    productPerformance[sale.product].orders += 1;
  });

  const topProducts = Object.entries(productPerformance)
    .map(([product, data]) => ({ 
      product, 
      ...data,
      avgOrderValue: data.revenue / data.orders
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Customer acquisition
  const customerAcquisition = {};
  filteredData.customers.forEach(customer => {
    const date = new Date(customer.createdAt).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
    customerAcquisition[date] = (customerAcquisition[date] || 0) + 1;
  });

  const acquisitionData = Object.entries(customerAcquisition)
    .map(([date, count]) => ({ date, customers: count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Sales by status
  const salesByStatus = filteredData.sales.reduce((acc, sale) => {
    acc[sale.status] = (acc[sale.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(salesByStatus).map(([status, count]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    count
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const metrics = [
    {
      name: 'Total Revenue',
      value: formatCurrency(filteredRevenue),
      change: '+12.5%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      name: 'Total Sales',
      value: formatNumber(filteredSalesCount),
      change: '+8.2%',
      changeType: 'positive',
      icon: BarChart3
    },
    {
      name: 'New Customers',
      value: formatNumber(filteredCustomersCount),
      change: '+15.3%',
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      name: 'Avg Order Value',
      value: formatCurrency(avgOrderValue),
      change: '+5.7%',
      changeType: 'positive',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Deep insights into your sales performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field w-32"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.name} className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {metric.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metric.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.changeType === 'positive' ? (
                          <TrendingUp className="self-center flex-shrink-0 h-4 w-4" />
                        ) : (
                          <TrendingDown className="self-center flex-shrink-0 h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {metric.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                        </span>
                        {metric.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fill="#3B82F6"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Status */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${value}`} />
              <YAxis dataKey="product" type="category" width={120} />
              <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Acquisition */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Acquisition</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={acquisitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="customers" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Performance Table */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Product Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr key={product.product}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(product.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(product.quantity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(product.orders)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(product.avgOrderValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

