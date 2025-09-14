// Generate mock data for the application
export function generateMockData() {
  const products = [
    'Laptop Pro 15"',
    'Wireless Headphones',
    'Smartphone X',
    'Tablet Air',
    'Gaming Mouse',
    'Mechanical Keyboard',
    'Monitor 4K',
    'Webcam HD',
    'Bluetooth Speaker',
    'Power Bank'
  ];

  const customerNames = [
    'John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Brown', 'David Wilson',
    'Lisa Anderson', 'Chris Taylor', 'Amanda Martinez', 'Robert Garcia', 'Jennifer Lee',
    'Michael Thompson', 'Jessica White', 'Daniel Harris', 'Ashley Martin', 'James Jackson',
    'Stephanie Moore', 'Andrew Young', 'Nicole Allen', 'Kevin King', 'Rachel Wright'
  ];

  const companies = [
    'TechCorp Inc.', 'Digital Solutions', 'Innovation Labs', 'Future Systems',
    'Smart Technologies', 'NextGen Corp', 'Advanced Computing', 'Modern Solutions',
    'Elite Enterprises', 'Premier Services'
  ];

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
  ];

  // Generate customers
  const customers = customerNames.map((name, index) => {
    const totalSpent = Math.floor(Math.random() * 2000) + 100;
    const totalOrders = Math.floor(Math.random() * 20) + 1;
    
    return {
      id: index + 1,
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company: companies[Math.floor(Math.random() * companies.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      totalSpent,
      totalOrders,
      status: Math.random() > 0.2 ? 'active' : 'inactive',
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    };
  });

  // Generate sales
  const sales = [];
  for (let i = 0; i < 150; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 5) + 1;
    const unitPrice = Math.floor(Math.random() * 500) + 50;
    const amount = quantity * unitPrice;
    
    sales.push({
      id: i + 1,
      customerId: customer.id,
      customerName: customer.name,
      product,
      quantity,
      unitPrice,
      amount,
      status: Math.random() > 0.1 ? 'completed' : 'pending',
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return {
    customers,
    sales,
    products
  };
}

