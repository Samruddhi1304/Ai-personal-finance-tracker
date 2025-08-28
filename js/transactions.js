// transactions.js
export let transactions = []; // store transactions in memory

export function addTransaction(desc, amount, type) {
    transactions.push({ desc, amount: Number(amount), type });
    console.log('Transaction added:', desc, amount, type);
    // TODO: update DOM & summary
}

export function initTransactionForm() {
    const form = document.getElementById('transactionForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const desc = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const type = document.getElementById('type').value;
        addTransaction(desc, amount, type);
        form.reset();
    });
}
