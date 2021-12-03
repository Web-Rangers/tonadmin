import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import classNames from 'classnames';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Chart from 'react-apexcharts';
// FAKE DATA
import { APICore } from '../../helpers/api/apiCore';

const PagesList = ({item, pagesData}) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    const showChart = (service_name,page_name) =>{
        const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/chart/service?service_name=${service_name}&page_name=${page_name}`;
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
                if(response.status===200){
                    console.log(response.data)
                }
            })
            .catch(error => console.log('page chart error', error))   
    }

    return (
        <>
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
                    {pagesData.pages.map((page,index) => {return <p key={`${item}-${index}`} className="mt-2 mb-0"><a target="_blank" href={page.url}>{page.name}</a> / <a onClick={() => showChart(pagesData.service_name,page.name)}><i className='mdi mdi-chart-timeline-variant bg-white text-primary widget-icon'></i></a> / status - {page.response_status==200 ? <span className="text-success">{page.response_status}</span> : <span className="text-danger">{page.response_status}</span>} / ping - {page.response_time}ms</p>})}
                </div>
            </Collapse>
        </>
    );
};


const api = new APICore();
const colors = ['#0088CC'];
let apexBarChartOpts = {
    grid: {
        padding: {
            left: 0,
            right: 0,
        },
    },
    noData: {
      text: 'No Data'
    },
    chart: {
        height: 550,
        type: 'area',
        parentHeightOffset: 0,
        toolbar: {
            show: true,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'straight',
        width: 2,
    },
    zoom: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    colors: colors,
    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return Math.floor(val);
            },
            offsetX: -15,
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.1,
            stops: [45, 100],
        },
    },
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

    useEffect(() => {
        updateChart(serverStatusData.service_name, 'd', 1)
    },[])

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
                let time = new Date(new Date().getTime() - timestamp)
                console.log(time)
                chartData.push({'x': time, 'y' : value})
            })
            let apexBarChartData = [
                {
                    name: 'Response Time',
                    data: chartData,
                },
            ];
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
                            <ul className="nav d-none d-lg-flex mt-3">
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
                                    <button className={`nav-link ${isActiveChart == '1w' ? "active" : "text-muted"}`} onClick={() => updateChart(serverStatusData.service_name, 'w', 1) } >
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
                            <Chart
                                options={apexBarChartOpts}
                                series={apexBarChartData}
                                type="area"
                                className="apex-charts mt-1"
                                height={350}
                            />
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