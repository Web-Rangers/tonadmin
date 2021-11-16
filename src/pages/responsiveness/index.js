import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Select from 'react-select';
import classNames from 'classnames';
import Lottie from "lottie-react";
import BeatLoader from "react-spinners/BeatLoader";
import Moment from 'react-moment';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import Table from '../../components/Table';
import StatisticsWidget from '../../components/StatisticsWidget';

import { APICore } from '../../helpers/api/apiCore';
Moment.globalFormat = 'DD.MM.YYYY HH:mm';
const api = new APICore();

const columns = [
    {
        Header: 'URL',
        accessor: 'url',
        sort: true,

    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
    }
];
const data = [
    {
        url: '372.324432.144.15.5',
        status: 'online'

    },
    {
        url: '344.445.5.6.6.1',
        status: 'offline'
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

const PagesList = ({item, pagesData}) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            <h5 className="m-0">
                {/* <Link
                    to="#"
                    className={classNames('d-block', { collapsed: open !== true })}
                    onClick={toggle}
                    aria-controls={'collapse' + item}
                    aria-expanded={open}>
                    Page list <i className="mdi mdi-chevron-down accordion-arrow"></i>
                </Link> */}<Link
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
const ServerStatusList = ({socketState, serverStatusData}) => {
    const [statusData,setStatusData] = useState(serverStatusData);

    return (
        <Col lg={4}>
            <Card>
                <Card.Body>
                    {
                        (socketState!=ReadyState.OPEN) ?
                        <SkeletonTheme>
                            <Skeleton count={5} />
                        </SkeletonTheme>
                        :
                        <>
                        <h4 className="header-title">{statusData.service_name} status</h4>
                        <div>
                            {statusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/statusData.pages.length == 1 ? <h3 className="mt-3 mb-3 text-success">ONLINE 100%</h3> : statusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/statusData.pages.length > 0 ? <h3 className="mt-3 mb-3 text-warning">ONLINE {(statusData.pages.filter((page) => page.response_status==200 ? page.response_status : null ).length/statusData.pages.length*100).toFixed(0)}%</h3> : <h3 className="mt-3 mb-3 text-danger">OFFLINE</h3> }
                            <PagesList item="1" pagesData={statusData} />
                        </div>
                        </>  
                    }
                </Card.Body>
            </Card>
        </Col>
    );
};

export default function Responsiveness(props){
    const selectedDate = useRef(new Date());
    const [socketUrl, setSocketUrl] = useState(process.env.REACT_APP_API_URL);
    const [messageHistory, setMessageHistory] = useState([]);
    const {
      sendMessage,
      lastMessage,
      readyState,
    } = useWebSocket(socketUrl, {
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
      });
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    const [serversStatusResponse,setServersStatusResponse] = useState();
    //FAKE DATA
    const [statusdataElections,setStatusdataElections] = useState();
    const [dataVoting,setDataVoting] = useState();
    const [dataSlashing,setDataSlashing] = useState();
    const [dataDHT,setDataDHT] = useState();

    //FAKE RESPONSE
    useEffect(async () => {
        getElectionsStatus();
        //setTimeout(()=>{ setStatusdataTonOrg({status:"online"}); },500);      
        //setTimeout(()=>{ setStatusdataTonSh({status:"online", ping:"48ms"}); },1000);
        //setTimeout(()=>{ setStatusdataToncenterCom({status:"offline"}); },2000);
        setTimeout(()=>{ setDataVoting({count:79}); },1800);
        setTimeout(()=>{ setDataSlashing({count:11}); },2000);
        setTimeout(()=>{ setDataDHT(data); },1000);
        selectedDate.current = new Date();
    }, []);

    useEffect(() => {
        if (lastMessage !== null) {
            // console.log(lastMessage.data);
            setMessageHistory(prev => prev.concat(lastMessage));            
            // setStatusdataTonOrg(JSON.parse(lastMessage.data)[0]);
            // setStatusdataTonSh(JSON.parse(lastMessage.data)[1]);
            // setStatusdataToncenterCom(JSON.parse(lastMessage.data)[2]);
            setServersStatusResponse(JSON.parse(lastMessage.data));
        }
    }, [lastMessage, setMessageHistory]);
    
    const getElectionsStatus = async () =>{
        const result = await api.sendJRPC('/', 'status')
        if(result && !result.error && result.data &&  result.data.result !== "empty"){
            let data = result.data.result
            // setValidatorAddress(data.validatorWalletAddr)
            // let unixTime = data.validatorStatus.unixtime;
  
            // switch(true){
            //   case parseFloat(data.validatorEfficiency) > 90:
            //     data.validatorEfficiency =  <span className="text-success">{data.validatorEfficiency}%</span>
            //   case parseFloat(data.validatorEfficiency) > 50:
            //     data.validatorEfficiency = <span className="text-warning">{data.validatorEfficiency}%</span>
            //   case parseFloat(data.validatorEfficiency) > 0:
            //     data.validatorEfficiency = <span className="text-danger">{data.validatorEfficiency}%</span>
            //   default:
            //     data.validatorEfficiency = null
            // }
            setStatusdataElections(data);
  
            /*  Object.keys(data).forEach(row => {
                tableData.push({
                    name: data[row].name,
                    status: data[row].status,
                    workchain: data[row].workchain,
                    balance: data[row].balance,
                    address: data[row].addr,
                })
              })*/
  
        }else{
            console.log("JRPC ERROR")
        }
    }

    return (
        <>
            <Row>
                {serversStatusResponse ? serversStatusResponse.map((server, index) => <ServerStatusList key={`status_${index}`} socketState={readyState} serverStatusData={server} />) : null}
            </Row>
            <Row>
                <Col lg={4}>
                    {!statusdataElections ?
                        <Card> {/*className="tilebox-one bg-success"*/}
                          <Card.Body>
                            <SkeletonTheme>{/*className="bg-success" color="#0eb862" highlightColor="#0ed16e"*/}
                                <Skeleton count={5} />
                            </SkeletonTheme>
                          </Card.Body>
                        </Card>
                        :
                        <StatisticsWidget
                            icon={`mdi mdi-vote-outline bg-white ${(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "text-success" : "text-warning"}`}
                            description={(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "OPEN" : "CLOSED"}
                            title="Election status"

                            stats={(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "OPEN" : "CLOSED"}
                            trend={{
                                textClass: 'badge badge-light-lighten',
                                icon: 'mdi mdi-clock',
                                value: (statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? 'End of elections: ' : "Next elections: ",
                                time: (statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? <Moment unix >{statusdataElections.endElection}</Moment> : <Moment unix >{statusdataElections.startNextElection}</Moment>,
                            }}
                            bgclassName={(statusdataElections.electionId)&&(selectedDate.current<statusdataElections.endElection) ? "bg-success" : "bg-warning"}
                            textClass="text-white">
                        </StatisticsWidget>
                    }
                </Col>
                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Config votings</h4>
                            {!dataVoting ?
                                <div className="mt-2">
                                    <SkeletonTheme>
                                        <Skeleton count={4} />
                                    </SkeletonTheme>
                                </div>
                                :
                                <div>
                                    <h3 className="mt-3 mb-3">{dataVoting.count}</h3>
                                    <p className="mb-0 text-muted">
                                        <span className="text-nowrap">Votes</span>
                                    </p>
                                </div>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Slashing</h4>
                            {!dataSlashing ?
                                <div className="mt-2">
                                    <SkeletonTheme>
                                        <Skeleton count={4} />
                                    </SkeletonTheme>
                                </div>
                                :
                                <div>
                                    <h3 className="mt-3 mb-3">{dataSlashing.count}</h3>
                                    <p className="mb-0 text-muted">
                                        <span className="text-nowrap">Slashes</span>
                                    </p>
                                </div>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
              <Col>
                  <Card>
                      <Card.Body>
                            <h4 className="header-title">Public DHT-servers performance</h4>
                            {!dataDHT ? 
                                <Skeleton count={4} height={15} />
                                : 
                                <Table
                                columns={columns}
                                data={dataDHT}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={false}
                            /> 
                            }
                      </Card.Body>
                  </Card>
              </Col>
            </Row>
        </>
    )
}