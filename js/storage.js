/*
 * storage.js
 * Saves and loads transactions using Local Storage.
 */


function saveTransactions() {

    localStorage.setItem(
        "smg_transactions",
        JSON.stringify(transactions)
    );

}



function loadTransactions() {

    const saved =
        localStorage.getItem("smg_transactions");


    if (!saved) {

        return;

    }


    transactions = JSON.parse(saved);


    renderTransactions();

    updateDashboard();

    updateCharts();

}