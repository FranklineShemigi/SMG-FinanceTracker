// Default category rules
let rules = [
    { keyword: "NAIVAS", category: "Food|Groceries" },
    { keyword: "KPLC", category: "Bills|Electricity" },
    { keyword: "SALARY", category: "Income|Salary" },
    { keyword: "SHELL", category: "Transport|Fuel" }
];

function addRule() {

    const keyword =
        document.getElementById("ruleKeyword")
        .value
        .toUpperCase()
        .trim();

    const category =
        document.getElementById("ruleCategory")
        .value
        .trim();

    const subcategory =
        document.getElementById("ruleSubcategory")
        .value
        .trim();

    if (!keyword || !category || !subcategory) {

        alert("Please fill in all fields.");

        return;

    }

    rules.push({

        keyword,
        category: `${category}|${subcategory}`

    });
    
    saveRules();

    document.getElementById("ruleKeyword").value = "";
    document.getElementById("ruleCategory").value = "";
    document.getElementById("ruleSubcategory").value = "";

    renderRules();

}

function renderRules() {

    const container =
        document.getElementById("rulesContainer");

    container.innerHTML = rules.map(rule =>

        `<div class="badge">
            If contains "${rule.keyword}" → ${rule.category.replace("|", " > ")}
        </div>`

    ).join("");

}

function applyRules() {

    transactions.forEach(transaction => {

        for (const rule of rules) {

            if (
                transaction.recipient
                    .toUpperCase()
                    .includes(rule.keyword)
            ) {

                const [category, subcategory] =
                    rule.category.split("|");

                transaction.category = category;
                transaction.subcategory = subcategory;

                break;

            }

        }

        if (!transaction.category) {

            transaction.category =
                transaction.type === "income"
                    ? "Income"
                    : "Uncategorized";

            transaction.subcategory = "Other";

        }

    });

    saveTransactions();

    renderTransactions();

    updateDashboard();

}