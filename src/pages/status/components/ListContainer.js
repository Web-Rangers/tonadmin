import React from 'react'

export default function ListContainer({children}) {
    const style = {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        flexwrap: 'wrap',
    }
    return (
        <div style={style}>
            {children}
        </div>
    )
}
