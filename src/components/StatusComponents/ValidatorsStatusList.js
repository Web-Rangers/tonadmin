import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Skeleton from 'react-loading-skeleton';

// components

import Table from '../Table';

const columns = [
    {
        Header: 'Wallet / ADNL',
        accessor: 'adnlAddr',
        sort: true,
        Cell: Wallet,
    },
    {
        Header: 'Status',
        accessor: 'online',
        sort: true,
        Cell: Online,
    },
    {
        Header: 'Weight',
        accessor: 'weight',
        sort: true,
    },
    {
        Header: 'Efficiency',
        accessor: 'efficiency',
        sort: true,
        sorting_desc:true,
        Cell: Cell,
    },

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

function Cell({ value }) {
  switch(true){
    case parseFloat(value) > 90:
      return <span className="text-success">{value}%</span>
    case parseFloat(value) > 50:
      return <span className="text-warning">{value}%</span>
    default:
      return <span className="text-danger">{value}%</span>
  }
}

function Online({ value }) {
  switch(value){
    case true:
      return <span className="badge badge-success-lighten">ONLINE</span>
    default:
      return <span className="badge badge-danger-lighten">OFFLINE</span>
  }
}

function Wallet({ value }) {
  let url = "https://ton.sh/address/" + value;
  if(value.length <= 48){
    return <a target="_blank" href={url}>{value}</a>
  }else{
    return value;
  }

}

const ValidatorsStatusList = ({socketState, data}) => {
  const [tableData, setTableData] = useState(data)
  const update = useRef(true)

  useEffect(()=>{
    if(update.current){
        setTableData(data);
    }
  }, data)

    return (
        <>
            <Card>
              <Card.Header>
                <Card.Title>
                  <Row>
                    <Col lg={10}>
                      <h4 className="mb-0">Validators Status</h4>
                    </Col>
                    <Col lg={2}>
                      <Button variant={update.current ? "primary" : "danger"} onClick={()=>{update.current = !update.current}}>Live update {update.current? 'ON':'OFF'} </Button>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Header>
                <Card.Body>
                  <Table
                      columns={columns}
                      data={tableData}                        
                      pageSize={10}
                      sizePerPageList={sizePerPageList}
                      isSortable={true}
                      pagination={true}
                  />
                </Card.Body>
            </Card>
        </>
    );
};

export default ValidatorsStatusList;
