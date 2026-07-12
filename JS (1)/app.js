
// Data stores
let transactions = [];
let rules = [
  { keyword: "NAIVAS", category: "Food|Groceries" },
  { keyword: "KPLC", category: "Bills|Electricity" },
  { keyword: "SALARY", category: "Income|Salary" },
  { keyword: "SHELL", category: "Transport|Fuel" }
];
let pieChart, barChart;

// M-PESA Parser - handles most formats
function parseMPesaMessage(msg) {
  const result = { raw: msg, type: 'expense', amount: 0, recipient: '', date: '', code: '' };

  // Get transaction code: first word usually
  const codeMatch = msg.match(/^([A-Z0-9]{10})/);
  if (codeMatch) result.code = codeMatch[1];

  // Amount: Ksh2,500.00 or Ksh 2,500
  const amountMatch = msg.match(/Ksh\s?([\d,]+\.?\d*)/i);
  if (amountMatch) result.amount = parseFloat(amountMatch[1].replace(/,/g, ''));

  // Type: sent, paid, received, deposited
  if (/received|deposited/i.test(msg)) result.type = 'income';
  if (/sent|paid to|withdraw/i.test(msg)) result.type = 'expense';

  // Recipient: "paid to X" or "sent to X" or "from X"
  const recipientMatch = msg.match(/(?:to|from)\s+([A-Z0-9\s]+?)(?:\s+on|\s+for|\.)/i);
  if (recipientMatch) result.recipient = recipientMatch[1].trim();

  // Date: 12/5/25 or 12/05/2025
  const dateMatch = msg.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
  if (dateMatch) {
    let [d, m, y] = dateMatch[1].split('/');
    if (y.length === 2) y = '20' + y;
    result.date = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
  } else {
    result.date = new Date().toISOString().split('T')[0];
  }

  return result;
}

function parseSMS() {
  const input = document.getElementById('smsInput').value;
  const lines = input.split('\n').filter(l => l.trim());
  transactions = lines.map(parseMPesaMessage);
  applyRules();
  renderTransactions();
  updateDashboard();
}

function addRule() {
  const keyword = document.getElementById('ruleKeyword').value.toUpperCase();
  const category = document.getElementById('ruleCategory').value;
  if (!keyword) return;
  rules.push({ keyword, category });
  document.getElementById('ruleKeyword').value = '';
  renderRules();
}

function renderRules() {
  const container = document.getElementById('rulesContainer');
  container.innerHTML = rules.map(r =>
    `<div class="badge">If contains "${r.keyword}" → ${r.category.replace('|', ' > ')}</div>`
  ).join(' ');
}

function applyRules() {
  transactions.forEach(tx => {
    for (let rule of rules) {
      if (tx.recipient.toUpperCase().includes(rule.keyword)) {
        const [cat, subcat] = rule.category.split('|');
        tx.category = cat;
        tx.subcategory = subcat;
        break;
      }
    }
    if (!tx.category) {
      tx.category = tx.type === 'income'? 'Income' : 'Uncategorized';
      tx.subcategory = 'Other';
    }
  });
  renderTransactions();
  updateDashboard();
}

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
