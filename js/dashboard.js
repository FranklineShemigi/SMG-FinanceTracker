function renderTransactions() {

    const tbody = document.querySelector("#txTable tbody");

    tbody.innerHTML = transactions.map(tx => `
        <tr>
            <td>${tx.date}</td>
            <td class="${tx.type}">${tx.type}</td>
            <td>Ksh ${tx.amount.toLocaleString()}</td>
            <td>${tx.recipient}</td>
            <td>${tx.category} > ${tx.subcategory}</td>
        </tr>
    `).join("");

}

function updateDashboard() {

    const income = transactions
        .filter(tx => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);

    const expense = transactions
        .filter(tx => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);

    document.getElementById("totalIncome").textContent =
        `Ksh ${income.toLocaleString()}`;

    document.getElementById("totalExpense").textContent =
        `Ksh ${expense.toLocaleString()}`;

    document.getElementById("balance").textContent =
        `Ksh ${(income - expense).toLocaleString()}`;
    
}