import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, BarChart3, TrendingUp, DollarSign } from 'lucide-react';

const Charts = ({ transactions }) => {
  // Calculate data for charts
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');
  
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  // Category breakdown
  const categoryData = expenses.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  // Monthly data (simulated for demo)
  const monthlyData = [
    { month: 'Dec', income: 2800, expenses: 1200 },
    { month: 'Jan', income: totalIncome, expenses: totalExpenses },
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const PieChartComponent = () => {
    const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    
    let currentAngle = 0;
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <PieChart className="w-5 h-5 text-purple-600" />
            Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg width="200" height="200" viewBox="0 0 200 200">
                {Object.entries(categoryData).map(([category, amount], index) => {
                  const percentage = (amount / total) * 100;
                  const angle = (amount / total) * 360;
                  const startAngle = currentAngle;
                  const endAngle = currentAngle + angle;
                  
                  const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  
                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                  ].join(' ');
                  
                  currentAngle += angle;
                  
                  return (
                    <path
                      key={category}
                      d={pathData}
                      fill={colors[index % colors.length]}
                      stroke="white"
                      strokeWidth="2"
                      className="hover:opacity-80 transition-opacity duration-200"
                    />
                  );
                })}
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{formatAmount(total)}</div>
                  <div className="text-sm text-gray-600">Total Expenses</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            {Object.entries(categoryData).map(([category, amount], index) => {
              const percentage = ((amount / total) * 100).toFixed(1);
              return (
                <div key={category} className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{formatAmount(amount)}</div>
                    <div className="text-xs text-gray-500">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const BarChartComponent = () => {
    const maxAmount = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses)));
    const scale = 150 / maxAmount;

    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Monthly Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-center gap-8">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center">
                <div className="flex items-end gap-2 mb-2">
                  <div className="relative group">
                    <div
                      className="w-12 bg-gradient-to-t from-green-400 to-green-500 rounded-t-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      style={{ height: `${data.income * scale}px` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {formatAmount(data.income)}
                    </div>
                  </div>
                  <div className="relative group">
                    <div
                      className="w-12 bg-gradient-to-t from-red-400 to-red-500 rounded-t-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      style={{ height: `${data.expenses * scale}px` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {formatAmount(data.expenses)}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-700">{data.month}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded"></div>
              <span className="text-sm">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded"></div>
              <span className="text-sm">Expenses</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TrendChartComponent = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.toDateString() === date.toDateString();
      });
      
      const dayExpenses = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        expenses: dayExpenses
      });
    }

    const maxExpense = Math.max(...last7Days.map(d => d.expenses), 1);
    const scale = 120 / maxExpense;

    return (
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            <TrendingUp className="w-5 h-5 text-green-600" />
            7-Day Spending Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-end justify-between">
            {last7Days.map((day, index) => (
              <div key={day.date} className="flex flex-col items-center">
                <div className="relative group">
                  <div
                    className="w-8 bg-gradient-to-t from-teal-400 to-teal-500 rounded-t-sm shadow-md hover:shadow-lg transition-all duration-200"
                    style={{ height: `${day.expenses * scale || 2}px` }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {formatAmount(day.expenses)}
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-700 mt-2">{day.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PieChartComponent />
      <BarChartComponent />
      <TrendChartComponent />
    </div>
  );
};

export default Charts;