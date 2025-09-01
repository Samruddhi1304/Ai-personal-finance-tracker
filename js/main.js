import { addTransaction } from "./transactions.js";

document.getElementById("transactionForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const transaction = {
    amount: parseFloat(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value
  };

  addTransaction(transaction);

  // Reset form
  e.target.reset();
});
