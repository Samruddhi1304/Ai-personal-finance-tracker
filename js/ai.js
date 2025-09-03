export function generateAdvice(transactions) {
  if (!transactions || transactions.length === 0) {
    return "Add some transactions to get personalized advice!";
  }

  const expenses = transactions.filter(t => t.type === "expense");
  const income = transactions.filter(t => t.type === "income");
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);

  if (totalExpense > totalIncome * 0.8) {
    return "⚠️ Your expenses are more than 80% of your income. Try to cut down on non-essential spending!";
  } else if (totalExpense < totalIncome * 0.5) {
    return "🎉 Great job! You're saving more than half your income. Consider investing your savings.";
  } else {
    return "💡 Keep tracking your expenses. Small savings add up over time!";
  }
}