import React from 'react'

export default function BridgeContainer({children}) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width: '280px',
        height: '250px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px',
    }
    const innerContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '10px',
    }
    return (
        <div style={style}>
            <h2>Bridge Status</h2>
            <div style={innerContainerStyle}>
                {children}
            </div>
        </div>
    )
}
