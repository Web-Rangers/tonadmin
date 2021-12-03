import React, { useEffect, useState } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import Table from '../Table';

const columns = [
    {
        Header: 'Address',
        accessor: 'address',
        sort: true,
    },
    {
        Header: 'Height',
        accessor: 'height',
        sort: true,
    },
    {
        Header: 'Transactions',
        accessor: 'transactions',
        sort: false,
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

export default function BlockInfo() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData(50, 1)
    },[])

    function fetchData(limit, offset) {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/metric/blocks?limit=${limit}&offset_id=${offset}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const request = {
            method: "GET",
            headers: headers,
            credentials: "include",
        }
        fetch(url, request)
            .then(async (response) => {
                const data = await response.json();
                const tableData = []
                console.log(data);
                Object.entries(data.result.blocks_rate).forEach(([key, value]) => {
                    // console.log(key, value);
                    tableData.push({
                        address: <a href={`https://ton.sh/address/${key}`} target="_blank">{key}</a>,
                        height: value.height,
                        transactions: <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Transactions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {value.transactions.map((transaction,index) => {
                                    return <Dropdown.Item key={`${index}/${transaction.hash}`}>{transaction.hash}</Dropdown.Item>
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    })
                })
                setData(tableData);
            })
            .catch(error => console.log('page chart error', error))
    }

    return (
        <Card>
            <Card.Header>
                <Card.Title>Block Info</Card.Title>
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
