// ai.js
import { transactions } from './transactions.js';

export function showAISuggestions() {
    const suggestionList = document.getElementById('suggestionList');
    suggestionList.innerHTML = '';

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const savings = totalIncome - totalExpenses;

    if (totalExpenses > 0.7 * totalIncome) {
        suggestionList.innerHTML += `<li>⚠️ Consider cutting unnecessary expenses!</li>`;
    }
    if (savings > 0.2 * totalIncome) {
        suggestionList.innerHTML += `<li>💡 Good savings! Think about investing.</li>`;
    }
}
