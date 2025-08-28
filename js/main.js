// main.js
import { addTransaction, initTransactionForm } from './transactions.js';
import { updateSummary } from './summary.js';
import { showAISuggestions } from './ai.js';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initTransactionForm();
    updateSummary();
    showAISuggestions();
});
