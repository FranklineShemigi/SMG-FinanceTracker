function addManualTransaction() {

    const date =
        document.getElementById("manualDate").value;

    const type =
        document.getElementById("manualType").value;

    const amount =
        parseFloat(
            document.getElementById("manualAmount").value
        );

    const recipient =
        document.getElementById("manualRecipient").value;


    const category =
        document.getElementById("manualCategory").value;


    const subcategory =
        document.getElementById("manualSubcategory").value;


    if (!date || !amount || !recipient) {

        alert("Please fill all required fields.");

        return;

    }


    transactions.push({

        code: "MANUAL",

        date,

        type,

        amount,

        recipient,

        category: category || "Uncategorized",

        subcategory: subcategory || "Other",

        raw: "Manual Entry"

    });


    saveTransactions();

    renderTransactions();

    updateDashboard();

    updateCharts();


    document.getElementById("manualForm").reset();

}