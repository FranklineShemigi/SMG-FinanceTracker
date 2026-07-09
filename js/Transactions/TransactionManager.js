/**
 * ==========================================
 * SMG - FinanceTracker
 * Transaction Manager
 * Version: 0.1.0
 * ==========================================
 */

class TransactionManager {
    constructor() {
        this.transactions = [];
    }

    /**
     * Add a transaction
     * @param {Object} transaction
     */
    add(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Return all transactions
     */
    getAll() {
        return this.transactions;
    }

    /**
     * Find transaction by ID
     * @param {String} id
     */
    getById(id) {
        return this.transactions.find(tx => tx.id === id);
    }

    /**
     * Delete transaction
     * @param {String} id
     */
    delete(id) {
        this.transactions = this.transactions.filter(tx => tx.id !== id);
    }

    /**
     * Calculate total income
     */
    getTotalIncome() {
        return this.transactions
            .filter(tx => tx.type === "income")
            .reduce((total, tx) => total + tx.amount, 0);
    }

    /**
     * Calculate total expenses
     */
    getTotalExpenses() {
        return this.transactions
            .filter(tx => tx.type === "expense")
            .reduce((total, tx) => total + tx.amount, 0);
    }

    /**
     * Current balance
     */
    getBalance() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }
}

const transactionManager = new TransactionManager();

