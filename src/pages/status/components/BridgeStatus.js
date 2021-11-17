import React from 'react'

interface BridgeStatusProps {
    status: Boolean,
    title: String
}

export default function BridgeStatus({status, title}: BridgeStatusProps) {
    const style = {
        padding: '5px',
        width: '120px',
        fontSize: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    }
    const statusStyle = {
        color: status ? 'green' : 'red',
        fontSize: '24px',
    }
    return (
        <div style={style}>
            <span>{title}</span>
            <span style={statusStyle}>{status ? "ONLINE" : "OFFLINE"}</span>
        </div>
    )
}
