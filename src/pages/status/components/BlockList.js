import React from 'react'

interface BlockListProps {
    blocks: any[]
}

export default function BlockList({blocks}: BlockListProps) {

    const style = {
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        height: '250px',
        backgroundColor: '#fafafa',
        padding: '10px',
        border: '1px solid #ccc',
    }

    return (
        <div style={style}>
            <h2>Blocks</h2>
            {
                blocks.map(block => <div key={block}>{block}</div>)
            }
        </div>
    )
}
