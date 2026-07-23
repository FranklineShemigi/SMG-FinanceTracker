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

function saveRules() {

    localStorage.setItem(
        "smg_rules",
        JSON.stringify(rules)
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

function loadRules() {

    const saved =
        localStorage.getItem("smg_rules");

    if (!saved) {

        return;

    }

    rules = JSON.parse(saved);

    renderRules();

}