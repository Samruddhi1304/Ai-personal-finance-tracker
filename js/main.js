import { addTransaction } from "./transactions.js";
import { generateAdvice } from "./ai.js";

window.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("statsChart").getContext("2d");

  let statsChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [0, 0],
          backgroundColor: ["#10B981", "#EF4444"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "white" }, 
        },
      },
    },
  });

  document.getElementById("filterSelect").addEventListener("change", (e) => {
    updateStatsChart(e.target.value);
  });

  document.getElementById("transactionForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const transaction = {
      amount: parseFloat(document.getElementById("amount").value),
      type: document.getElementById("type").value,   
      category: document.getElementById("category").value,
      date: document.getElementById("date").value,
      notes: document.getElementById("notes").value,
    };

    addTransaction(transaction);
    updateStatsChart(); 
    updateAIAdvice(); 
    e.target.reset();
  });

  function updateStatsChart(filter = "all") {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    if (filter === "all") {
      statsChart.data.labels = ["Income", "Expenses"];
      statsChart.data.datasets[0].data = [income, expenses];
      statsChart.data.datasets[0].backgroundColor = ["#10B981", "#EF4444"];
    } else if (filter === "income") {
      statsChart.data.labels = ["Income"];
      statsChart.data.datasets[0].data = [income];
      statsChart.data.datasets[0].backgroundColor = ["#10B981"];
    } else if (filter === "expenses") {
      statsChart.data.labels = ["Expenses"];
      statsChart.data.datasets[0].data = [expenses];
      statsChart.data.datasets[0].backgroundColor = ["#EF4444"];
    }

    statsChart.update();
  }

  updateStatsChart();
  updateAIAdvice();
});

function updateAIAdvice() {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  document.getElementById("aiAdvice").textContent = generateAdvice(transactions);
}