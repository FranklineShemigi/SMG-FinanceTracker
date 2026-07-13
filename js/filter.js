function filterTransactionsByMonth() {

    const month =
        document.getElementById("monthFilter").value;


    if (month === "") {

        renderTransactions();

        updateDashboard();

        updateCharts();

        return;

    }


    const filteredTransactions =
        transactions.filter(tx =>
            tx.date.startsWith(month)
        );


    renderTransactions(filteredTransactions);

    updateDashboard(filteredTransactions);

    updateCharts(filteredTransactions);

}