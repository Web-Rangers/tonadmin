import React, { useState, useEffect } from 'react';
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

    return (
        <>
            <Card>
                <Card.Body>
                    {(!data)||(socketState!=ReadyState.OPEN) ?
                        <Skeleton count={5} height={15} />
                        :
                        <>
                        <h4 className="header-title">TON Validators list</h4>
                        <Table
                            columns={columns}
                            data={data}                        
                            pageSize={10}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                        />
                        </>
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default ValidatorsStatusList;