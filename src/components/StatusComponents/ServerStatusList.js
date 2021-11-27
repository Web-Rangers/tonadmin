import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import classNames from 'classnames';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Chart from 'react-apexcharts';

const PagesList = ({item, pagesData}) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

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
                    {pagesData.pages.map((page,index) => {return <p key={`${item}-${index}`} className="mt-2 mb-0"><a target="_blank" href={page.url}>{page.name}</a> / status - {page.response_status==200 ? <span className="text-success">{page.response_status}</span> : <span className="text-danger">{page.response_status}</span>} / ping - {page.response_time}ms</p>})}
                </div>
            </Collapse>
        </>
    );
};
// FAKE DATA
import { APICore } from '../../helpers/api/apiCore';

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
        trim: true,
        tickAmount: 20,
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
                return val/10**12 + 'T';
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
let apexBarChartData = [
    {
        name: 'Hashrate',
        data: [],
    },
];
// FAKE DATA END
const ServerStatusList = ({socketState, serverStatusData}) => {
    const [chartView, setChartView] = useState(false);
    const [isActiveChart, setIsActiveChart] = useState();
    const [apexBarChartData, setApexBarChartData] = useState({
        name: 'Hashrate',
        data: [],
    });

    const toggleChart = () => {
        setChartView(!chartView);
    }

    const updateChart = async (period) => {
        let chartData = []
        api.get(window.location.protocol + "//ton.swisscops.com/statistics/jsons/hashrate_"+period + '.json').then(response => {
          let data = JSON.parse(response.data.replace(/[\n\r\t]/g,""));
          let start = data.meta.start;
          let step = data.meta.step;
          for(let item of data.data){
            if(item[0]){
              chartData.push({'x': new Date(start * 1000), 'y' : item[0]})
            }
            start += step;
          }
    
          let apexBarChartData = [
              {
                  name: 'Hashrate',
                  data: chartData,
              },
          ];
          setApexBarChartData(apexBarChartData);
          setIsActiveChart(period);
        //   this.setState({apexBarChartData, isActiveChart: period, loading: false})
        })
    
    }
    useEffect(() => {
        updateChart('1month');
    },[]);

    return (
        <Card className='widget-flat'>
            <Card.Body>
                {
                    (socketState!=ReadyState.OPEN)||(!serverStatusData) ?
                    <SkeletonTheme>
                        <Skeleton count={5} />
                    </SkeletonTheme>
                    :
                    <>
                    <h4 className="header-title">{serverStatusData.service_name} status 
                        {/* <div className="float-end">
                            <button onClick={toggleChart} className="btn btn-light p-0 border">
                                {!chartView ?
                                    <i className='mdi mdi-chart-line bg-white text-success widget-icon'></i>
                                    :
                                    <i className='mdi mdi-format-align-justify bg-white text-success widget-icon'></i>
                                }
                            </button>
                        </div> */}
                    </h4>
                    <div>
                        {/* {!chartView ?
                            <> */}
                                {serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length == 1 ? <h3 className="mt-3 mb-3 text-success">ONLINE 100%</h3> : serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length > 0 ? <h3 className="mt-3 mb-3 text-warning">ONLINE {(serverStatusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/serverStatusData.pages.length*100).toFixed(0)}%</h3> : <h3 className="mt-3 mb-3 text-danger">OFFLINE</h3> }
                                <PagesList item="1" pagesData={serverStatusData} />
                            {/* </>
                            :
                            <>
                            <ul className="nav d-none d-lg-flex mt-3">
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '1day' ? "active" : "text-muted"}`} onClick={() => updateChart('1day') }>
                                        1d
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '1week' ? "active" : "text-muted"}`} onClick={() => updateChart('1week') } >
                                        7d
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '1month' ? "active" : "text-muted"}`} onClick={() => updateChart('1month') } >
                                        1m
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '3month' ? "active" : "text-muted"}`} onClick={() => updateChart('3month') } >
                                        3m
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link ${isActiveChart == '6months' ? "active" : "text-muted"}`} onClick={() => updateChart('6months') } >
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
                        } */}
                    </div>
                    </>  
                }
            </Card.Body>
        </Card>
    );
};

export default ServerStatusList;