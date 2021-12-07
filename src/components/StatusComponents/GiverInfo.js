import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Table from '../Table';

const columns = [
    {
        Header: 'Address',
        accessor: 'address',
        sort: true,
    },
    {
        Header: 'Balance',
        accessor: 'balance',
        sort: true,
    },
    {
        Header: 'USD',
        accessor: 'usd',
        sort: true,
    }

];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    }
];

export default function GiverInfo() {
    const [data, setData] = useState([])
    useEffect(async () => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/metric/givers`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const request = {
            method: "GET",
            headers: headers,
            credentials: "include",
        }
        const prices = await fetch('https://ton.org/getpriceg/')
            .then(res => res.json())
            .catch(err => console.log(err));
        fetch(url, request)
            .then(async (response) => {
                const data = await response.json();
                const tableData = []
                Object.entries(data.result.givers).forEach(([key, value]) => {
                    // console.log(key, value);
                    tableData.push({
                        address: <a href={`https://ton.sh/address/${key}`} target="_blank">{key}</a>,
                        balance: `${value.toFixed(2)} TON`,
                        usd: `${(value * prices['the-open-network'].usd).toFixed(2)} USD`,
                    })
                })
                setData(tableData);
            })
            .catch(error => console.log('page chart error', error))
    },[])

    return (
        <Card>
            <Card.Header>
                <Card.Title>Giver Info</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table
                    columns={columns}
                    data={data}                        
                    pageSize={10}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                />
            </Card.Body>
        </Card>
    )
}
