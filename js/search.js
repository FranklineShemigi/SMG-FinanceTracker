/*
 * search.js
 * Handles searching transactions.
 */


function searchTransactions() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    if (keyword === "") {

        renderTransactions();

        updateDashboard();

        updateCharts();

        return;

    }


    const results = transactions.filter(tx =>

        tx.recipient.toLowerCase().includes(keyword) ||

        tx.category.toLowerCase().includes(keyword) ||

        tx.subcategory.toLowerCase().includes(keyword) ||

        tx.amount.toString().includes(keyword)

    );


    renderTransactions(results);

    updateDashboard(results);

    updateCharts(results);

}