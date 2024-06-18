import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

function LedgerAccountEntry({ entry }) {
    return (
        <tr>
            <th>{entry.CreatedAt}</th>
            <td>{entry.label}</td>
            <td>{entry.position == "DEBIT"  ? entry.value : "-"}</td>
            <td>{entry.position == "CREDIT" ? entry.value : "-"}</td>
        </tr>
    )
}

function LedgerAccount({ account, balance }) {
    const [detail, setDetail] = useState(null)
    useEffect(() => {
        (async () => {
            const data = await balance.getAccountDetail(account.id)
            setDetail(data)
        })()
    }, [])

    return (
        <div className="my-2 p-5 border border-dashed">
            <div className="flex justify-between mb-2">
                <h3 className="text-xl">{account.name}</h3>
                <h3 className="text-xl">Balance: {account.balance}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Debit</th>
                            <th>Credit</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            detail === null 
                            ? <h3 className="text-3xl">Could not fetch account detail</h3>
                            : detail.entries.map((entry, index) => <LedgerAccountEntry key={index} entry={entry}/>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

/**
 * @param {{balance: import("../libs/balance.js").Balance}}
 */
export default function Ledger({ balance }) {
    const [accounts, setAccounts] = useState([])
    useEffect(() => {
        balance.accounts().then(data => setAccounts(data))
    }, [])

    return (
        <Layout>
            <div className="py-5 border-b border-gray-500 dark:border-gray-100">
                <h1 className="text-5xl">Ledger</h1>
            </div>
            {accounts.map((account, index) => <LedgerAccount key={index} account={account} balance={balance}/>)}
        </Layout>
    )
}
