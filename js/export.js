/*
 * export.js
 * Exports transactions to a CSV file.
 */

function exportCSV() {

    if (transactions.length === 0) {

        alert("No transactions to export.");

        return;

    }

    let csv =
        "Date,Type,Amount,Recipient,Category,Subcategory\n";

    transactions.forEach(tx => {

        csv +=
            `${tx.date},` +
            `${tx.type},` +
            `${tx.amount},` +
            `"${tx.recipient}",` +
            `"${tx.category}",` +
            `"${tx.subcategory}"\n`;

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "smg-finance-transactions.csv";

    link.click();

    URL.revokeObjectURL(url);

}