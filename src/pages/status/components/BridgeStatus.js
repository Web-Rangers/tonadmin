import React from 'react'

interface BridgeStatusProps {
    status: Boolean,
    title: String
}

export default function BridgeStatus({status, title}: BridgeStatusProps) {
    return (
        <>
            <h2 className="mt-3 header-title">{title}</h2>
            <div>
                {status ? <h3 className="mt-2 text-success">ONLINE</h3> :  <h3 className="mt-3 mb-3 text-danger">OFFLINE</h3>}
            </div>
        </> 
    )
}
