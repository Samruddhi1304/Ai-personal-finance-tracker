// summary.js
import { transactions } from './transactions.js';

export function updateSummary() {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const savings = totalIncome - totalExpenses;

    document.getElementById('totalIncome').textContent = totalIncome;
    document.getElementById('totalExpenses').textContent = totalExpenses;
    document.getElementById('savings').textContent = savings;
}
