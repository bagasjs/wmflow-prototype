import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

function JournalTransactionEntry({ first, balance, entry }) {
    const [account, setAccount] = useState(null)
    useEffect(() => {
        (async () => {
            const data = await balance.getAccountDetail(entry.account_id)
            setAccount(data)
        })()
    }, [])

    return (
        <tr>
            <th>{first ? entry.CreatedAt : ""}</th>
            <td>{first ? entry.description : ""}</td>
            <td>{account ? account.name : entry.account_id}</td>
            <td>{entry.position == "DEBIT"  ? entry.value : "-"}</td>
            <td>{entry.position == "CREDIT" ? entry.value : "-"}</td>
        </tr>
    )
}

function JournalTransaction({ transaction, balance }) {
    const [detail, setDetail] = useState(null)
    useEffect(() => {
        (async () => {
            const data = await balance.getTransactionDetail(transaction.id)
            setDetail(data)
        })()
    }, [])

    return (
        <>
            {
                detail === null 
                ? (
                    <tr>
                        <th>{transaction.created_at}</th>
                        <td>{transaction.label}</td>
                        <td>Failed to fetch the entry</td>
                        <td>Failed to fetch the entry</td>
                        <td>Failed to fetch the entry</td>
                    </tr>
                )
                : detail.items.map((entry, index) => 
                    <JournalTransactionEntry first={index === 0} balance={balance} key={index} entry={entry}/>)
            }
        </>
    )
}

function JournalPosting({ balance, onNewTransaction }) {
    const [accounts, setAccounts] = useState([])
    const [entryAmount, setEntryAmount] = useState(1)
    useEffect(() => {
        balance.accounts().then(data => setAccounts(data))
    }, [])

    const onSubmit = async ev => {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const entryItems = []
        for(let i = 0; i < entryAmount; i++) {
            const accountId = formData.get(`entry-item-${i}-account-id`) 
            const position = formData.get(`entry-item-${i}-position`) 
            const value = formData.get(`entry-item-${i}-value`) 
            if(accountId && position && value) {
                entryItems.push({
                    label: "",
                    description: "",
                    position: position,
                    value: parseInt(value),
                    account_id: parseInt(accountId),
                })
            }
        }

        const desc = formData.get("description")
        const resp = await balance.createTransaction(entryItems, desc, desc)
        onNewTransaction(resp)
    }

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">Post new Journal Entry</h3>
                    <div className="space-x-3">
                        <button onClick={() => setEntryAmount(entryAmount + 1)} className="btn btn-outline btn-info">+</button>
                        <button onClick={() => setEntryAmount(entryAmount - 1)} className="btn btn-outline btn-error">-</button>
                    </div>
                </div>
                <form method="dialog" className="flex flex-col" onSubmit={onSubmit}>
                    <div className="mb-5">
                        <label className="label" htmlFor="description"> Description </label>
                        <input id="description" type="text" placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Position</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(Array(entryAmount)).map((_, i) => (
                                <tr key={i}>
                                    <td>
                                        <select name={`entry-item-${i}-account-id`} className="select w-full max-w-xs">
                                        {accounts.map((account, index) => (
                                            <option key={index} value={account.id}>{account.name}</option>) 
                                        )}
                                        </select>                       
                                    </td>
                                    <td>
                                        <select name={`entry-item-${i}-position`} className="select w-full max-w-xs">
                                            <option value="DEBIT">DEBIT</option>
                                            <option value="CREDIT">CREDIT</option>
                                        </select>                       
                                    </td>
                                    <td>
                                        <input name={`entry-item-${i}-value`} type="number" min="0" 
                                            className="input input-bordered w-full max-w-xs" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="modal-action">
                        <button type="button" className="btn btn-outline btn-error">Close</button>
                        <button type="submit" className="btn btn-outline btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default function Journal({ balance }) {
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        balance.transactions().then(data => setTransactions(data))
    }, [])

    const onNewTransaction = response => {
        if(!response.error) {
            balance.transactions().then(data => setTransactions(data))
        }
    }

    return (
        <Layout>
            <div className="flex justify-between items-center py-5 border-b border-gray-500 dark:border-gray-100">
                <h1 className="text-5xl">Journal</h1>
                <button className="btn btn-ghost" onClick={()=>document.getElementById('my_modal_5').showModal()}>
                    + Entry
                </button>
            </div>
            <JournalPosting balance={balance} onNewTransaction={onNewTransaction}/>
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Account</th>
                        <th>Debit</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => 
                        <JournalTransaction key={index} transaction={transaction} balance={balance}/>)}
                </tbody>
            </table>
        </Layout>
    )
}
