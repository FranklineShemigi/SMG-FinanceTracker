/*
 * delete.js
 * Deletes a transaction from the list.
 */

function deleteTransaction(index) {

    const confirmed = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) {

        return;

    }

    transactions.splice(index, 1);

    saveTransactions();

    renderTransactions();

    updateDashboard();

}