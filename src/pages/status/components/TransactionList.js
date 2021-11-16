import React from 'react'
import TonWeb from 'tonweb'

interface  TransactionListProps {
    transactions: any[]
}

export default function TransactionList({transactions}: TransactionListProps) {

    const style = {
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        height: '250px',
        width: '620px',
        backgroundColor: '#fafafa',
        padding: '10px',
        gap: '10px',
        border: '1px solid #ccc',
    }
    const transactionStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        gap: '3px',
        border: '1px solid #ccc',
    }

    return (
        <div style={style}>
            <h2>Transactions</h2>
                {
                    transactions.map((transaction) => {
                            const Address = TonWeb.utils.Address;
                            const address = new Address(transaction.account);
                                return <div style={transactionStyle} key={transaction.hash}>
                                    <span> Account: {address.toString(true, true, false, true)}</span>
                                    <span> Hash: {transaction.hash} </span>
                                    <span> Mode: {transaction.mode}</span>
                                    <span> lt: {transaction.lt}</span>
                                </div>
                        }
                    )
                }
        </div>
    )
}
