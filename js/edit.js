/*
 * edit.js
 * Edit an existing transaction.
 */

function editTransaction(index) {

    const tx = transactions[index];

    const amount = prompt(
        "Amount:",
        tx.amount
    );

    if (amount === null) return;

    const recipient = prompt(
        "Recipient:",
        tx.recipient
    );

    if (recipient === null) return;

    const category = prompt(
        "Category:",
        tx.category
    );

    if (category === null) return;

    const subcategory = prompt(
        "Subcategory:",
        tx.subcategory
    );

    if (subcategory === null) return;


    tx.amount = parseFloat(amount);

    tx.recipient = recipient;

    tx.category = category;

    tx.subcategory = subcategory;


    saveTransactions();

    renderTransactions();

    updateDashboard();

}