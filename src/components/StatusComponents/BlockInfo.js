import React, { useEffect, useState, useRef } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import Table from '../Table';

const columns = [
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
    const offset = useRef(-50);

    useEffect(() => {
        fetchData(50, offset.current)
    },[])

    function fetchData(limit) {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/metric/blocks?limit=${limit}&offset_id=${offset.current+50}`;
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
                Object.entries(data.result.blocks_rate).forEach(([key, value]) => {
                    // console.log(key, value);
                    tableData.push({
                        height: <a href={`https://ton.sh/block/-1/${value.height}`} target="_blank">{value.height}</a>,
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
                offset.current += limit;
                setData(tableData);
            })
            .catch(error => console.log('page chart error', error))
    }

    function fetchDataBack(limit) {
        if (offset.current === 0){ 
            alert('No more data to show')
            return
        }
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/metric/blocks?limit=${limit}&offset_id=${offset.current-50}`;
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
                Object.entries(data.result.blocks_rate).forEach(([key, value]) => {
                    // console.log(key, value);
                    tableData.push({
                        height: <a href={`https://ton.sh/block/-1/${value.height}`} target="_blank">{value.height}</a>,
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
                offset.current -= limit;
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
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    onLastPage={()=>{fetchData(50)}}
                    onFirstPage={()=>{fetchDataBack(50)}}
                />
            </Card.Body>
        </Card>
    )
}
