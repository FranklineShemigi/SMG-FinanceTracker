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