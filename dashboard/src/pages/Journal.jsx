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

function JournalPosting({ balance }) {
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        balance.accounts().then(data => setAccounts(data))
    }, [])

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Post new Journal Entry</h3>
                <form className="flex flex-col" method="dialog">
                    <div>
                        <label>Account</label>
                        <select className="select w-full max-w-xs">
                            <option>Homer</option>
                            <option>Marge</option>
                            <option>Bart</option>
                            <option>Lisa</option>
                            <option>Maggie</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button className="btn">Close</button>
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
    return (
        <Layout>
            <div className="flex justify-between items-center py-5 border-b border-gray-500 dark:border-gray-100">
                <h1 className="text-5xl">Journal</h1>
                <button className="btn btn-ghost" onClick={()=>document.getElementById('my_modal_5').showModal()}>+ Entry</button>
            </div>
            <JournalPosting balance={balance}/>
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
