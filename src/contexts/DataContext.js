import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateMockData } from '../utils/mockData';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load mock data on app start
    const mockData = generateMockData();
    setCustomers(mockData.customers);
    setSales(mockData.sales);
    setProducts(mockData.products);
  }, []);

  // Customer operations
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id, updates) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  // Sales operations
  const addSale = (sale) => {
    const newSale = {
      ...sale,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setSales(prev => [...prev, newSale]);
  };

  const updateSale = (id, updates) => {
    setSales(prev => prev.map(sale => 
      sale.id === id ? { ...sale, ...updates } : sale
    ));
  };

  const deleteSale = (id) => {
    setSales(prev => prev.filter(sale => sale.id !== id));
  };

  // Regenerate mock data
  const regenerateMockData = () => {
    const mockData = generateMockData();
    setCustomers(mockData.customers);
    setSales(mockData.sales);
    setProducts(mockData.products);
  };

  // Analytics data
  const getAnalyticsData = () => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalCustomers = customers.length;
    const totalSales = sales.length;
    const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

    // Monthly revenue
    const monthlyRevenue = {};
    sales.forEach(sale => {
      const month = new Date(sale.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + sale.amount;
    });

    // Top products
    const productSales = {};
    sales.forEach(sale => {
      productSales[sale.product] = (productSales[sale.product] || 0) + sale.amount;
    });

    const topProducts = Object.entries(productSales)
      .map(([product, revenue]) => ({ product, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Customer segments
    const customerSegments = {
      'High Value': customers.filter(c => c.totalSpent > 1000).length,
      'Medium Value': customers.filter(c => c.totalSpent > 500 && c.totalSpent <= 1000).length,
      'Low Value': customers.filter(c => c.totalSpent <= 500).length
    };

    return {
      totalRevenue,
      totalCustomers,
      totalSales,
      averageOrderValue,
      monthlyRevenue,
      topProducts,
      customerSegments
    };
  };

  const value = {
    customers,
    sales,
    products,
    loading,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addSale,
    updateSale,
    deleteSale,
    regenerateMockData,
    getAnalyticsData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

