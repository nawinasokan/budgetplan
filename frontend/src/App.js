import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Toaster } from "./components/ui/toaster";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";
import Summary from "./components/Summary";
import { getStoredTransactions, saveTransactions } from "./mock";
import { Wallet, PlusCircle, BarChart3, TrendingUp, DollarSign } from "lucide-react";

const BudgetPlannerApp = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const storedTransactions = getStoredTransactions();
    setTransactions(storedTransactions);
  }, []);

  const handleAddTransaction = (transaction) => {
    const updatedTransactions = [transaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleDeleteTransaction = (transactionId) => {
    const updatedTransactions = transactions.filter(t => t.id !== transactionId);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Budget Planner
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Track your income and expenses, monitor your budget, and gain insights into your spending patterns with beautiful charts and analytics.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full p-5">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-200 rounded-lg"
            >
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="add" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-200 rounded-lg"
            >
              <PlusCircle className="w-4 h-4" />
              Add Transaction
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-200 rounded-lg"
            >
              <DollarSign className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="charts" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-200 rounded-lg"
            >
              <BarChart3 className="w-4 h-4" />
              Charts
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <Summary transactions={transactions} />
          </TabsContent>

          <TabsContent value="add" className="flex justify-center">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction}
            />
          </TabsContent>

          <TabsContent value="charts">
            <Charts transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BudgetPlannerApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
