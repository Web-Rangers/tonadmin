import React, { useRef, useState } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import Table from '../../components/LiteServersTable';
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

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
    },
    {
        Header: 'Button',
        accessor: 'button',
        sort: false
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

const LiteServersPerformance = ({socketState, data}) => {
    const [modal, setModal] = useState(false)
    const [chartData, setChartData] = useState()
    const [isActiveChart, setIsActiveChart] = useState('1m')
    const currentServer = useRef({ip: '', port: ''})

    function showModal(info){
        setModal(true)
        currentServer.current = {ip: info.ip, port: info.port};
        updateChart('d', 7)
    }

    function updateChart(time_period, time_value){
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/chart/server/server_chart?ip="${currentServer.current.ip}"&port=${currentServer.current.port}&time_period=${time_period}&time_value=${time_value}`;
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
                let chartData = [];
                Object.entries(data.result.chart).map(([key, value]) => {
                    let timestamp = key+1;
                    if (time_period === 'h') timestamp = timestamp*100*60
                    if (time_period === 'd') timestamp = timestamp*100*60*60
                    if (time_period === 'm') timestamp = timestamp*100*60*60*24
                    if (time_period === 'y') timestamp = timestamp*100*60*60*24*30
                    let time = new Date(new Date().getTime() - timestamp);
                    chartData.push(formatChartData(time, value))
                })
                setChartData(chartData)
                setIsActiveChart(`${time_value}${time_period}`)
            })
            .catch(error => console.log('page chart error', error))
    }

    return (
        <>
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton >
                    <h3>{currentServer.current.ip}/{currentServer.current.port} </h3>
                </Modal.Header>
                <Modal.Body>
                <ul className="nav d-lg-flex mt-3">
                        <li className="nav-item">
                            <button className={`nav-link ${isActiveChart == '1h' ? "active" : "text-muted"}`} onClick={() => updateChart('h', 1) }>
                                1h
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${isActiveChart == '1d' ? "active" : "text-muted"}`} onClick={() => updateChart('d', 1) }>
                                1d
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${isActiveChart == '7d' ? "active" : "text-muted"}`} onClick={() => updateChart('d', 7) } >
                                7d
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${isActiveChart == '1m' ? "active" : "text-muted"}`} onClick={() => updateChart('m', 1) } >
                                1m
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${isActiveChart == '3m' ? "active" : "text-muted"}`} onClick={() => updateChart('m', 3) } >
                                3m
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${isActiveChart == '6m' ? "active" : "text-muted"}`} onClick={() => updateChart('m', 6) } >
                                6m
                            </button>
                        </li>
                    </ul>
                    <div className="chart-container">
                        <ResponsiveContainer height={280}>
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 50,
                                    right: 20,
                                    left: -20,
                                    bottom: 5,
                                }}
                            >
                                {/* <CartesianGrid /> */}
                                <XAxis stroke="#adb5bd" dataKey="x" fontSize="12px" />
                                <YAxis stroke="#adb5bd" dataKey="ping" fontSize="12px" />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Line type="monotone" dataKey="ping" stroke="#0088CC" strokeWidth="2px" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Modal.Body>
            </Modal>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Public LiteServers performance</h4>
                    <Table
                        columns={columns}
                        data={data}
                        pageSize={10}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        onClick={showModal}
                    />    
                </Card.Body>
            </Card>
        </>
    );
};


function formatChartData(time, value) {
    return { 'x': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}`, 'ping': Math.round(value) };
}


export default LiteServersPerformance;
