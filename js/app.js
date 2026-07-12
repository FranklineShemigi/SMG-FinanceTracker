
// Data stores
let transactions = [];

function renderTransactions() {
  const tbody = document.querySelector('#txTable tbody');
  tbody.innerHTML = transactions.map(tx => `
    <tr>
      <td>${tx.date}</td>
      <td class="${tx.type}">${tx.type}</td>
      <td>Ksh ${tx.amount.toLocaleString()}</td>
      <td>${tx.recipient}</td>
      <td>${tx.category} > ${tx.subcategory}</td>
    </tr>
  `).join('');
}
function updateDashboard() {
  const income = transactions.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);

  document.getElementById('totalIncome').textContent = `Ksh ${income.toLocaleString()}`;
  document.getElementById('totalExpense').textContent = `Ksh ${expense.toLocaleString()}`;
  document.getElementById('balance').textContent = `Ksh ${(income - expense).toLocaleString()}`;

  // Pie chart by category
  const byCategory = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });

  if (pieChart) pieChart.destroy();
  pieChart = new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: Object.keys(byCategory),
      datasets: [{
        data: Object.values(byCategory),
        backgroundColor: ['#E8E4DC', '#FFFFFF', '#666666', '#999999', '#CCCCCC']
      }]
    },
    options: {
      plugins: { legend: { labels: { color: '#E8E4DC' } } }
    }
  });

  // Bar chart by month
  const byMonth = {};
  transactions.forEach(t => {
    const month = t.date.slice(0,7);
    byMonth[month] = (byMonth[month] || 0) + (t.type === 'income'? t.amount : -t.amount);
  });

  if (barChart) barChart.destroy();
  barChart = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(byMonth).sort(),
      datasets: [{
        label: 'Net Flow',
        data: Object.keys(byMonth).sort().map(m => byMonth[m]),
        backgroundColor: '#E8E4DC'
      }]
    },
    options: {
      scales: {
        x: { ticks: { color: '#E8E4DC' } },
        y: { ticks: { color: '#E8E4DC' } }
      },
      plugins: { legend: { labels: { color: '#E8E4DC' } } }
    }
  });
}

function calcCompound() {
  const P = parseFloat(document.getElementById('principal').value);
  const r = parseFloat(document.getElementById('rate').value) / 100;
  const t = parseFloat(document.getElementById('years').value);
  const n = parseFloat(document.getElementById('compound').value);
  const A = P * Math.pow(1 + r/n, n*t);
  document.getElementById('compoundResult').innerHTML =
    `Final Amount: <span class="income">Ksh ${A.toLocaleString(undefined, {maximumFractionDigits:2})}</span><br>
     Interest Earned: <span class="income">Ksh ${(A-P).toLocaleString(undefined, {maximumFractionDigits:2})}</span>`;
}

function loadSample() {
  document.getElementById('smsInput').value = `NB38XN4G Confirmed. Ksh2,500.00 paid to NAIVAS SUPERMARKET on 12/5/25 at 7:23 PM.
AB45YZ8K Confirmed. You have received Ksh45,000.00 from SALARY on 1/5/25 at 9:00 AM.
CD12EF3H Confirmed. Ksh1,200.00 paid to KPLC PREPAID on 10/5/25 at 2:15 PM.
GH78IJ9L Confirmed. Ksh3,000.00 paid to SHELL on 11/5/25 at 5:40 PM.`;
  parseSMS();
}

// Init
renderRules();
