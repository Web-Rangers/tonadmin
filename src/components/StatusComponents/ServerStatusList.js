import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import classNames from 'classnames';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Chart from 'react-apexcharts';
// FAKE DATA
import { APICore } from '../../helpers/api/apiCore';
import { Bar, BarChart, Label, Tooltip, XAxis, YAxis, Line, LineChart, Legend, ResponsiveContainer } from 'recharts';
import Moment from 'react-moment';

const PagesList = ({item, pagesData}) => {
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false)
    const [chartData, setChartData] = useState()
    const [isActiveChart, setIsActiveChart] = useState('1m')
    const currentPage = useRef({service: '', page: ''})

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    const showChart = async (service_name, page_name, time_period, time_value) =>{
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/chart/service/pagechart?service_name=${service_name}&page_name=${page_name}&time_period=${time_period}&time_value=${time_value}`;
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
                currentPage.current={service: service_name, page: page_name}
                setChartData(chartData.sort(function (a, b) {
                    if (a.timeForSort < b.timeForSort) {
                      return -1;
                    }
                    if (a.timeForSort > b.timeForSort) {
                      return 1;
                    }
                    return 0;
                }))
                setIsActiveChart(`${time_value}${time_period}`)
                setModal(true)
            })
            .catch(error => console.log('page chart error', error))   
    }

    function updateChart(time_period, time_value){
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/chart/service/pagechart?service_name=${currentPage.current.service}&page_name=${currentPage.current.page}&time_period=${time_period}&time_value=${time_value}`;
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
                setChartData(chartData.sort(function (a, b) {
                    if (a.timeForSort < b.timeForSort) {
                      return -1;
                    }
                    if (a.timeForSort > b.timeForSort) {
                      return 1;
                    }
                    return 0;
                }))
                setIsActiveChart(`${time_value}${time_period}`)
            })
            .catch(error => console.log('page chart error', error))   
    }

    return (
        <>
        <Modal show={modal} onHide={() => setModal(false)}>
            <Modal.Header closeButton >
                <h3>{currentPage.current.service}/{currentPage.current.page}</h3>
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
            <h5 className="m-0">
                <Link
                    to="#"
                    className={classNames('d-block pb-1', { collapsed: open !== true })}
                    onClick={toggle}
                    aria-controls={'collapse' + item}
                    aria-expanded={open}>
                    Pages list <i className="mdi mdi-chevron-down accordion-arrow"></i>
                </Link>
            </h5>
            <Collapse in={open} appear>
                <div>
                    {pagesData.pages.map((page,index) => {
                        return <p key={`${item}-${index}`} className="mt-2 mb-0">
                            <a target="_blank" href={page.url}>{page.name}</a>
                            /
                            <a onClick={() => showChart(pagesData.service_name,page.name,'d',1)}>
                                <i className='mdi mdi-chart-timeline-variant bg-white text-primary widget-icon'></i>
                            </a> / status - {page.response_status==200 ? <span className="text-success">{page.response_status}</span> : <span className="text-danger">{page.response_status}</span>} / ping - {page.response_time}ms</p>})}
                </div>
            </Collapse>
        </>
    );
};

const ServerStatusList = ({socketState, serverStatusData}) => {
    const [chartView, setChartView] = useState(false);
    const [isActiveChart, setIsActiveChart] = useState();
    const [apexBarChartData, setApexBarChartData] = useState({
        name: 'Hashrate',
        data: [],
    });

    const toggleChart = () => {
        setChartView(!chartView);
        if (!chartView) updateChart(serverStatusData.service_name, 'd', 1)
    }

    const updateChart = async (service_name, time_period, time_value) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/chart/service?service_name=${service_name}&time_period=${time_period}&time_value=${time_value}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        const request = {
            method: "GET",
            headers: headers,
            credentials: "include",
        }
        fetch(url, request).then(async response => {
            let data = await response.json();
            data = data.result.chart;
            
            let chartData = [];
            Object.entries(data).map(([key, value]) => {
                let timestamp = key+1;
                if (time_period === 'h') timestamp = timestamp*100*60
                if (time_period === 'd') timestamp = timestamp*100*60*60
                if (time_period === 'm') timestamp = timestamp*100*60*60*24
                if (time_period === 'y') timestamp = timestamp*100*60*60*24*30
                let time = new Date(new Date().getTime() - timestamp);
                chartData.push(formatChartData(time, value))
            })
            let apexBarChartData = {
                name: 'Response Time',
                data: chartData.sort(function (a, b) {
                    if (a.timeForSort < b.timeForSort) {
                      return -1;
                    }
                    if (a.timeForSort > b.timeForSort) {
                      return 1;
                    }
                    return 0;
                }),
            }

            setApexBarChartData(apexBarChartData);
            setIsActiveChart(`${time_value}${time_period}`);
        })
    
    }

    return (
        <Card className='widget-flat'>
            <Card.Body>
                {
                    <>
                    <h4 className="header-title">{serverStatusData.service_name} status 
                        <div className="float-end">
                            <button onClick={toggleChart} className="btn btn-light p-0 border">
                                {!chartView ?
                                    <i className='mdi mdi-chart-line bg-white text-success widget-icon'></i>
                                    :
                                    <i className='mdi mdi-format-align-justify bg-white text-success widget-icon'></i>
                                }
                            </button>
                        </div>
                    </h4>
                    <div>
                        {!chartView ?
                            <>
                                {serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length == 1 ? <h3 className="mt-3 mb-3 text-success">ONLINE 100%</h3> : serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length > 0 ? <h3 className="mt-3 mb-3 text-warning">ONLINE {(serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length*100).toFixed(0)}%</h3> : <h3 className="mt-3 mb-3 text-danger">OFFLINE</h3> }
                                <PagesList item="1" pagesData={serverStatusData} />
                            </>
                            :
                            <>
                            <ul className="nav d-lg-flex mt-3">
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '1h' ? "active" : "text-muted"}`} onClick={() => updateChart(serverStatusData.service_name, 'h', 1) }>
                                        1h
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '1d' ? "active" : "text-muted"}`} onClick={() => updateChart(serverStatusData.service_name, 'd', 1) }>
                                        1d
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '7d' ? "active" : "text-muted"}`} onClick={() => updateChart(serverStatusData.service_name, 'd', 7) } >
                                        7d
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '1m' ? "active" : "text-muted"}`} onClick={() => updateChart(serverStatusData.service_name, 'm', 1) } >
                                        1m
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '3m' ? "active" : "text-muted"}`} onClick={() => updateChart(serverStatusData.service_name, 'm', 3) } >
                                        3m
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '6m' ? "active" : "text-muted"}`} onClick={() => updateChart(serverStatusData.service_name, 'm', 6) } >
                                        6m
                                    </button>
                                </li>
                            </ul>
                            {apexBarChartData.data ?              
                            <ResponsiveContainer height={280}>
                                <LineChart
                                    data={apexBarChartData.data}
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
                            :
                            null
                            }
                            </>
                        }
                    </div>
                    </>  
                }
            </Card.Body>
        </Card>
    );
};

export default ServerStatusList;

function formatChartData(time, value) {
    return { 'x': `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()}`, 'ping': Math.round(value), 'timeForSort':time };
}
