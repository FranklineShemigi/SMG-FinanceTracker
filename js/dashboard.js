/*
 * dashboard.js
 * Renders transactions and updates dashboard statistics.
 */

function renderTransactions(data = transactions) {

    const tbody = document.querySelector("#txTable tbody");

    if (data.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table">
                    No transactions yet.<br>
                    Import M-PESA messages or add a manual transaction.
                </td>
            </tr>
        `;

        return;

    }

    tbody.innerHTML = data.map((tx, index) => `
        <tr>

            <td>${tx.date}</td>

            <td class="${tx.type}">
                ${tx.type}
            </td>

            <td>
                Ksh ${tx.amount.toLocaleString()}
            </td>

            <td>
                ${tx.recipient}
            </td>

            <td>
                ${tx.category} > ${tx.subcategory}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editTransaction(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${index})">
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