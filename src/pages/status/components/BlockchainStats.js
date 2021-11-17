import React from 'react'

interface BlockchainStatsProps {
    transferedAmount: integer,
    tps: float,
    validatorCount: integer
}

export default function BlockchainStats({transferedAmount, tps, validatorCount}: BlockchainStatsProps) {
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
        width: '49%',
    }
    const innerStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    }
    return (
        <div style={styles}>
            <h2>Blockchain Stats</h2>
            <div style={innerStyle}>
                <span>Transfered Total: {transferedAmount}</span>
                <span>TPS: {tps}</span>
                <span>Validators: {validatorCount}</span>
            </div>
        </div>
    )
}
