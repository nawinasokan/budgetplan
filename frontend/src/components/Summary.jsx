import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target, AlertTriangle } from 'lucide-react';

const Summary = ({ transactions }) => {
  const mockBudgets = {
    Food: { limit: 500, spent: 0 },
    Transportation: { limit: 300, spent: 0 },
    Entertainment: { limit: 200, spent: 0 }
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalIncome - totalExpenses;

  // Calculate category spending
  const categorySpending = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // Update budgets with actual spending
  Object.keys(mockBudgets).forEach(category => {
    mockBudgets[category].spent = categorySpending[category] || 0;
  });

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getAlertLevel = (percentage) => {
    if (percentage >= 90) return 'high';
    if (percentage >= 70) return 'medium';
    return 'low';
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Income</p>
                <p className="text-3xl font-bold text-green-800">{formatAmount(totalIncome)}</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Total Expenses</p>
                <p className="text-3xl font-bold text-red-800">{formatAmount(totalExpenses)}</p>
              </div>
              <div className="p-3 bg-red-200 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`shadow-lg border-0 bg-gradient-to-br ${
          netAmount >= 0 
            ? 'from-blue-50 to-cyan-50' 
            : 'from-orange-50 to-red-50'
        } hover:shadow-xl transition-shadow duration-300`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  netAmount >= 0 ? 'text-blue-700' : 'text-orange-700'
                }`}>
                  Net Amount
                </p>
                <p className={`text-3xl font-bold ${
                  netAmount >= 0 ? 'text-blue-800' : 'text-orange-800'
                }`}>
                  {formatAmount(netAmount)}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                netAmount >= 0 
                  ? 'bg-blue-200' 
                  : 'bg-orange-200'
              }`}>
                <DollarSign className={`w-6 h-6 ${
                  netAmount >= 0 ? 'text-blue-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            <Target className="w-6 h-6 text-purple-600" />
            Budget Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(mockBudgets).map(([category, budget]) => {
              const percentage = (budget.spent / budget.limit) * 100;
              const alertLevel = getAlertLevel(percentage);
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{category}</span>
                      {alertLevel === 'high' && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                      {alertLevel === 'medium' && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-800">
                        {formatAmount(budget.spent)} / {formatAmount(budget.limit)}
                      </div>
                      <div className={`text-xs ${
                        alertLevel === 'high' ? 'text-red-600' :
                        alertLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {percentage.toFixed(1)}% used
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-3 bg-gray-200"
                    />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Remaining: {formatAmount(Math.max(0, budget.limit - budget.spent))}</span>
                    <span className={
                      percentage > 100 ? 'text-red-600 font-medium' : ''
                    }>
                      {percentage > 100 ? `Over by ${formatAmount(budget.spent - budget.limit)}` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Total Budget</span>
              <span className="text-lg font-bold text-gray-800">
                {formatAmount(Object.values(mockBudgets).reduce((sum, b) => sum + b.limit, 0))}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-gray-600">Total Spent</span>
              <span className="text-sm font-medium text-gray-800">
                {formatAmount(Object.values(mockBudgets).reduce((sum, b) => sum + b.spent, 0))}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summary;