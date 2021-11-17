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
        backgroundColor: '#fff',
        borderRadius: '5px',
        width: '49%',
    }
    const innerStyle = {
        width: '100%',
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
