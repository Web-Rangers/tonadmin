import React from 'react'

interface ShardListProps {
    shards: any[]
}

export default function ShardList({shards}: ShardListProps) {

    const style = {
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        height: '220px',
        backgroundColor: '#fafafa',
        padding: '10px',
        border: '1px solid #ccc',
    }

    return (
        <div style={style}>
            <h2>Shards</h2>
            {
                shards.map(shard => <div key={shard.shardBlockNumber}>{shard.shardBlockNumber}</div>)
            }
        </div>
    )
}
