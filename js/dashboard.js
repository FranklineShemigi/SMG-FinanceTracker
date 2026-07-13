function renderTransactions(data = transactions) {

    const tbody = document.querySelector("#txTable tbody");

    tbody.innerHTML = data.map((tx, index) => `
        <tr>
            <td>${tx.date}</td>
            <td class="${tx.type}">${tx.type}</td>
            <td>Ksh ${tx.amount.toLocaleString()}</td>
            <td>${tx.recipient}</td>
            <td>${tx.category} > ${tx.subcategory}</td>

            <td>
                <button onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");

}


function updateDashboard(data = transactions) {

    const income = data
        .filter(tx => tx.type === "income")
        .reduce((sum, tx) => sum + tx.amount, 0);


    const expense = data
        .filter(tx => tx.type === "expense")
        .reduce((sum, tx) => sum + tx.amount, 0);


    const balance = income - expense;


    document.getElementById("totalIncome").textContent =
        `Ksh ${income.toLocaleString()}`;

    document.getElementById("totalExpense").textContent =
        `Ksh ${expense.toLocaleString()}`;

    document.getElementById("balance").textContent =
        `Ksh ${balance.toLocaleString()}`;


    updateCharts(data);

}