import React, { useState } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Table from '../../components/Table';

const columns = [
    {
        Header: 'IP',
        accessor: 'ip',
        sort: true,

    },
    {
        Header: 'Port',
        accessor: 'port',
        sort: true,
    },
    {
        Header: 'Ping',
        accessor: 'time',
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

const DHTserversPerformance = ({socketState, data}) => {
    
    return (
        <Card>
            <Card.Body>
                    <h4 className="header-title">Public DHT-servers performance</h4>
                    {(!data)||(socketState!=ReadyState.OPEN) ? 
                        <Skeleton count={4} height={15} />
                        : 
                        <Table
                        columns={columns}
                        data={data}
                        pageSize={5}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                    /> 
                    }
            </Card.Body>
        </Card>
    );
};

export default DHTserversPerformance;