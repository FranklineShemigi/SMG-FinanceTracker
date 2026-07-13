function calcCompound() {
    const P = parseFloat(document.getElementById("principal").value);
    const r = parseFloat(document.getElementById("rate").value) / 100;
    const t = parseFloat(document.getElementById("years").value);
    const n = parseFloat(document.getElementById("compound").value);

    const A = P * Math.pow(1 + r / n, n * t);

    document.getElementById("compoundResult").innerHTML =
        `Final Amount: <span class="income">Ksh ${A.toLocaleString(undefined, {
            maximumFractionDigits: 2
        })}</span><br>
        Interest Earned: <span class="income">Ksh ${(A - P).toLocaleString(undefined, {
            maximumFractionDigits: 2
        })}</span>`;
}