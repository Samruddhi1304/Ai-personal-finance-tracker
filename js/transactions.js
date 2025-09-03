let transactions = []; 

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
  const stored = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions = stored;
  updateSummary();
  renderTransactionList();
  if (transactions.length > 0) {
    updateLastTransaction(transactions[transactions.length - 1]);
  }
}

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
      return; 
    }
  }
  transactions.push(transaction);
  saveTransactions(); 
  updateLastTransaction(transaction);
  updateSummary();
  renderTransactionList();
}

export function getTransactions() {
  return transactions;
}

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

function updateSummary() {
  let income = 0,
    expense = 0;
  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });
  const balance = income - expense;

  const incomeEl = document.getElementById("totalIncome");
  const expenseEl = document.getElementById("totalExpense");
  const balanceEl = document.getElementById("totalBalance");

  if (incomeEl) incomeEl.textContent = `$${income.toFixed(2)}`;
  if (expenseEl) expenseEl.textContent = `$${expense.toFixed(2)}`;
  if (balanceEl) balanceEl.textContent = `$${balance.toFixed(2)}`;

  const profileBalanceEl = document.getElementById("profileBalance");
  if (profileBalanceEl) {
    profileBalanceEl.textContent = `$${balance.toFixed(2)}`;
  }
}

function renderTransactionList() {
  const listEl = document.getElementById("transactionList");
  if (!listEl) return;
  listEl.innerHTML = "";

  if (transactions.length === 0) {
    listEl.innerHTML = "<li class='text-gray-400'>No transactions yet.</li>";
    return;
  }

  [...transactions].reverse().forEach((t, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center py-2 border-b border-gray-700";
    li.innerHTML = `
      <div>
        <span>${t.date} - ${t.category}</span>
        <br>
        <span class="${t.type === "income" ? "text-green-400" : "text-red-400"} ml-2">
          $${t.amount}
        </span>
      </div>
      <button class="text-red-400 hover:text-red-600" data-index="${transactions.length - 1 - index}">Delete</button>
    `;
    listEl.appendChild(li);
  });

  listEl.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteTransaction(index);
    });
  });
}

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

  if (transactions.length > 0) {
    updateLastTransaction(transactions[transactions.length - 1]);
  } else {
    const lastTransactionEl = document.getElementById("lastTransaction");
    if (lastTransactionEl) {
      lastTransactionEl.innerHTML = `<p class="text-gray-400">No transactions yet.</p>`;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
  setupSeeAllButton();
});
