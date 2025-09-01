let transactions = []; // all transactions

// Save to localStorage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load from localStorage
function loadTransactions() {
  const stored = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions = stored;
  updateSummary();
  renderTransactionList();
  if (transactions.length > 0) {
    updateLastTransaction(transactions[transactions.length - 1]);
  }
}

// Add new transaction
export function addTransaction(transaction) {
   if (transaction.type === "expense") {
    let income = 0, expense = 0;
    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });
    const currentBalance = income - expense;

    if (transaction.amount > currentBalance) {
      alert("Expense cannot be greater than your current balance!");
      return; // stop here, don't add
    }
  }
  transactions.push(transaction);
  saveTransactions(); // save each time
  updateLastTransaction(transaction);
  updateSummary();
  renderTransactionList();
}

// Get all transactions
export function getTransactions() {
  return transactions;
}

// Update last transaction
function updateLastTransaction(transaction) {
  const lastTransactionEl = document.getElementById("lastTransaction");
  if (!lastTransactionEl) return;
  lastTransactionEl.innerHTML = `
    <p>${transaction.category} (${transaction.type})</p>
    <p class="${transaction.type === "income" ? "text-green-400" : "text-red-400"}">
      $${transaction.amount}
    </p>
  `;
}

// Recalculate balance
function updateSummary() {
  let income = 0,
    expense = 0;
  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });
  const balance = income - expense;

  // Dashboard values
  const incomeEl = document.getElementById("totalIncome");
  const expenseEl = document.getElementById("totalExpense");
  const balanceEl = document.getElementById("totalBalance");

  if (incomeEl) incomeEl.textContent = `$${income.toFixed(2)}`;
  if (expenseEl) expenseEl.textContent = `$${expense.toFixed(2)}`;
  if (balanceEl) balanceEl.textContent = `$${balance.toFixed(2)}`;

  // Profile card balance
  const profileBalanceEl = document.getElementById("profileBalance");
  if (profileBalanceEl) {
    profileBalanceEl.textContent = `$${balance.toFixed(2)}`;
  }
}

// Render all transactions list
function renderTransactionList() {
  const listEl = document.getElementById("transactionList");
  if (!listEl) return;
  listEl.innerHTML = "";

  if (transactions.length === 0) {
    listEl.innerHTML = "<li class='text-gray-400'>No transactions yet.</li>";
    return;
  }

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center py-2 border-b border-gray-700";
    li.innerHTML = `
      <div>
        <span>${t.date} - ${t.category} (${t.type})</span>
        <span class="${t.type === "income" ? "text-green-400" : "text-red-400"} ml-2">
          $${t.amount}
        </span>
      </div>
      <button class="text-red-400 hover:text-red-600" data-index="${index}">Delete</button>
    `;
    listEl.appendChild(li);
  });

  // Attach delete event listeners
  listEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteTransaction(index);
    });
  });
}


// --- Toggle transactions list ---
function setupSeeAllButton() {
  const btn = document.getElementById("seeAllBtn");
  const section = document.getElementById("allTransactions");
  if (!btn || !section) return;

  btn.addEventListener("click", () => {
    section.classList.toggle("hidden");
    if (section.classList.contains("hidden")) {
      btn.textContent = "See all transactions";
    } else {
      btn.textContent = "Hide transactions";
      renderTransactionList();
    }
  });
}
function deleteTransaction(index) {
  transactions.splice(index, 1); 
  saveTransactions();
  updateSummary();
  renderTransactionList();

  // Update last transaction
  if (transactions.length > 0) {
    updateLastTransaction(transactions[transactions.length - 1]);
  } else {
    const lastTransactionEl = document.getElementById("lastTransaction");
    if (lastTransactionEl) {
      lastTransactionEl.innerHTML = `<p class="text-gray-400">No transactions yet.</p>`;
    }
  }
}
// Load data immediately when page loads
window.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
  setupSeeAllButton();
});
