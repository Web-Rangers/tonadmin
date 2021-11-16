import React from 'react'

interface LiteserverStatusProps {
    responseTime: String,
    syncState: String,
}

export default function LiteserverStatus({responseTime, syncState}: LiteserverStatusProps) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#fafafa',
        border: '1px solid #ccc',
    }
    const innerStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    }
    return (
        <div style={style}>
            <h2>Liteservers Status</h2>
            <div style={innerStyle}>
                <span>Response Time: {responseTime}</span>
                <span>Sync State: {syncState}</span>
            </div>
        </div>
    )
}
