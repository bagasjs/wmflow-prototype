const AccountPosDebit  = "DEBIT"
const AccountPosCredit = "CREDIT"

const AccountTypeAsset     = "ASSET"
const AccountTypeLiability = "LIABILITY"
const AccountTypeEquity    = "EQUITY"
const AccountTypeRevenue   = "REVENUE"
const AccountTypeExpense   = "EXPENSE"

/**
 * @typedef {object} Balance
 * @property {string} url
 * @property {Map<string, number>} accountTable
 */

/**
 * @typedef {object} TransactionItem
 * @property {string} label
 * @property {string} description
 * @property {string} position
 * @property {number} value 
 * @property {number} account_id
 */

/**
 * @typedef {object} Transaction
 * @property {string} label
 * @property {string} description
 * @property {TransactionItem[]} items
 */

/**
 * @typedef {object} Account
 * @property {string} name
 */

/**
 * @constructor
 * @param {string} url
 * @returns {Balance}
 */
function Balance(url) {
    this.url = url
    this.accountTable = new Map()
}

/**
 * @memberof Balance
 * @param {string} name
 * @param {string} type
 * @param {string} normalPos
 * @param {number} parent_id
 * @returns {Account}
 */
Balance.prototype.createAccount = async function(name, type, normalPos, parent_id) {
    const resp = await fetch(`${this.url}/api/accounts`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": name,
            "balance": 0,
            "normal_position": normalPos,
            "current_position": normalPos,
            "type": type,
            "parent_id": parent_id,
        })
    })

    const data = await resp.json();
    this.accountTable.set(name, data["id"])
    return data
}

Balance.prototype.transactions = async function () {
    const resp = await fetch(`${this.url}/api/transactions`, {
        mode: "cors",
        headers: {
        }
    })
    const data = await resp.json();
    if(data.error) throw new Error(data.message)
    return data.data
}

Balance.prototype.getTransactionDetail = async function (id) {
    const resp = await fetch(`${this.url}/api/transactions/${id}`, {
        mode: "cors",
        headers: {
        }
    })
    const data = await resp.json();
    if(data["error"]) {
        throw new Error(data["message"])
    }
    return data.data;
}

Balance.prototype.accounts = async function () {
    const resp = await fetch(`${this.url}/api/accounts`, {
        mode: "cors",
        headers: {
        }
    })
    const data = await resp.json();
    if(data.error) throw new Error(data.message)
    for(const account of data.data) {
        if(!this.accountTable.has(account.name)) {
            this.accountTable.set(account.name, account.id)
        }
    }
    return data.data
}

Balance.prototype.getAccountDetail = async function (id) {
    const resp = await fetch(`${this.url}/api/accounts/${id}`, {
        mode: "cors",
        headers: {
        }
    })
    const data = await resp.json();
    if(data["error"]) {
        throw new Error(data["message"])
    }
    return data.data;
}

/**
 * @param {string} name
 * @returns {number}
 * @throws {Error}
 */
Balance.prototype.account = async function(name) {
    if(!this.accountTable.has(name)) {
        const resp = await fetch(`${this.url}/api/accounts/search?name=${name}`, {
            mode: "cors",
            headers: {
            }
        })
        const data = await resp.json();
        if(data["error"]) {
            throw new Error(data["message"])
        }
        this.accountTable.set(name, data.data.id)
    }
    return this.accountTable.get(name)
}

/**
 * @param {string} label
 * @param {TransactionItem[]} items
 * @param {string} description
 * @returns {Account}
 * @throws {Error}
 */
Balance.prototype.createTransaction = async function(items, label, description) {
    const resp = await fetch(`${this.url}/api/transactions`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "label": label,
            "description": description,
            "items": items,
        })
    })

    const data = await resp.json();
    return data
}

/**
 * @param {number} account_id
 * @param {number} value
 * @param {string} label
 * @param {string} description
 * @returns {TransactionItem}
 * @throws {Error}
 */
Balance.prototype.createDebitEntry = function (account_id, value, label, description) {
    return {
        label: label,
        description: description,
        account_id: account_id,
        value: value,
        position: AccountPosDebit,
    }
}

/**
 * @param {number} account_id
 * @param {number} value
 * @param {string} label
 * @param {string} description
 * @returns {TransactionItem}
 * @throws {Error}
 */
Balance.prototype.createCreditEntry = function (account_id, value, label, description) {
    return {
        label: label,
        description: description,
        account_id: account_id,
        value: value,
        position: AccountPosCredit,
    }
}

export {
    Balance,
}
