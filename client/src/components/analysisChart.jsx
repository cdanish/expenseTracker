import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userTrans } from "../redux/features/transSlice";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AnalysisChart() {

  const { transactions } = useSelector((state) => state.trans);

  // Group transactions by category for income and expense
  const incomeCategories = {};
  const expenseCategories = {};

  if(transactions){
    transactions.forEach((transaction) => {
      const { type, category, amount } = transaction;
      if (type === 'income') {
        incomeCategories[category] = (incomeCategories[category] || 0) + amount;
      } else if (type === 'expense') {
        expenseCategories[category] = (expenseCategories[category] || 0) + amount;
      }
    });
  }

  // Convert to array with percentages
  const totalIncome = Object.values(incomeCategories).reduce((sum, val) => sum + val, 0);
  const totalExpense = Object.values(expenseCategories).reduce((sum, val) => sum + val, 0);

  const incomeData = Object.entries(incomeCategories).map(([category, amount]) => ({
    category,
    amount,
    percentage: ((amount / totalIncome) * 100).toFixed(2),
  }));

  const expenseData = Object.entries(expenseCategories).map(([category, amount]) => ({
    category,
    amount,
    percentage: ((amount / totalExpense) * 100).toFixed(2),
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4560', '#8E44AD'];

  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4">

      <div className="flex flex-col justify-center items-center">
          <h3 className="text-2xl text-center mb-4 text-green-600">Income by Category</h3>
          <PieChart width={400} height={400}>
            <Pie 
              data={incomeData}
              dataKey="amount"
              nameKey="category"
              outerRadius="70%" 
              labelLine={false} 
              label={({ category, percentage }) => `${category}: ${percentage}%`}
            >
              {incomeData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />

            <Legend />
          </PieChart>
        
      </div>



      {/* Expense Pie Chart */}
      <div className="flex flex-col justify-center items-center">
          <h3 className="text-2xl text-center mb-4 text-red-600">Expense by Category</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={expenseData}
              dataKey="amount"
              nameKey="category"
              outerRadius="70%" 
              cx="50%"
              cy="50%"
              labelLine={false} 
              label={({ category, percentage }) => `
              ${category}: ${percentage}%
              `}
            >
              {expenseData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
      </div>

    </div>
  );
}

export default AnalysisChart;
