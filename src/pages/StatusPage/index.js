import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import ElectionsStatus from '../../components/StatusComponents/ElectionsStatus.js';
import ConfigVotings from '../../components/StatusComponents/ConfigVotings.js';
import SlashingData from '../../components/StatusComponents/SlashingData.js';
import LiteServersPerformance from '../../components/StatusComponents/LiteServersPerformance.js';
import ServerStatusList from "../../components/StatusComponents/ServerStatusList.js";
import BlockchainStats from '../../components/StatusComponents/BlockchainStats.js';
import BlockList from '../../components/StatusComponents/BlockList.js';
import BridgeContainer from '../../components/StatusComponents/BridgeContainer.js';
import BridgeStatus from '../../components/StatusComponents/BridgeStatus.js';
import ListContainer from '../../components/StatusComponents/ListContainer.js';
import LiteserverStatus from '../../components/StatusComponents/LiteserverStatus.js';
import ShardList from '../../components/StatusComponents/ShardList.js';
import TransactionList from '../../components/StatusComponents/TransactionList.js';
import Validators from '../../components/StatusComponents/Validators.js';
import LastBlock from '../../components/StatusComponents/LastBlock.js';
import ValidatorsStatusList from '../../components/StatusComponents/ValidatorsStatusList.js';
import GiverInfo from '../../components/StatusComponents/GiverInfo.js';
import TPSinfo from '../../components/StatusComponents/TPSinfo.js';


const StatusPage = (props): React$Element<React$FragmentType> => {
    const [socketUrl, setSocketUrl] = useState(process.env.REACT_APP_API_URL);
    const [messageHistory, setMessageHistory] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
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
    const [dataLT,setDataLT] = useState();
    const [dataElections,setDataElections] = useState();
    const [dataBridges,setDataBridges] = useState();
    const [dataValidators,setDataValidators] = useState();
    const [dataValidatorsList,setDataValidatorsList] = useState();
    const [dataVoting,setDataVoting] = useState();    
    const [dataComplaints,setDataComplaints] = useState();
    const [dataLastBlock,setDataLastBlock] = useState();
    const [dataBlocks,setDataBlocks] = useState();
    const [dataTPS,setDataTPS] = useState();

    useEffect(() => {},[readyState])

    useEffect(() => {
        if (lastMessage) {
            try{
                var lastmsgJSON = JSON.parse(lastMessage.data);
                setMessageHistory(prev => prev.concat(lastMessage));
                setServersStatusResponse(lastmsgJSON.services?lastmsgJSON.services:serversStatusResponse);
                var liteservers = lastmsgJSON.liteservers?lastmsgJSON.liteservers.map((server) => {return {ip:server.ip,port:server.port,time:server.time ? server.time.toFixed(0)+"ms" : "offline"}}):dataLT;
                setDataLT(liteservers);
                setDataElections(lastmsgJSON.electionId?{electionId:lastmsgJSON.electionId,start:lastmsgJSON.startElection,next:lastmsgJSON.startNextElection,end:lastmsgJSON.endElection}:dataElections);
                // setDataBridges(lastmsgJSON.bridge);
                setDataValidators(lastmsgJSON.onlineValidators&lastmsgJSON.total?{active:lastmsgJSON.onlineValidators ? lastmsgJSON.onlineValidators : 0,total:lastmsgJSON.totalValidators ? lastmsgJSON.totalValidators : 0}:dataValidators);
                
                let ValidatorsResponse = lastmsgJSON.validators ?lastmsgJSON.validators:[];
                let tableDataValidators = [];
                let totalWeight = 0
                Object.keys(ValidatorsResponse).forEach(row => {
                    totalWeight += ValidatorsResponse[row].weight
                })
                Object.keys(ValidatorsResponse).forEach(row => {
                    tableDataValidators.push({
                        adnlAddr: ValidatorsResponse[row].walletAddr ? ValidatorsResponse[row].walletAddr: ValidatorsResponse[row].adnlAddr,
                        status: ValidatorsResponse[row].status,
                        efficiency: ValidatorsResponse[row].efficiency,
                        weight: (ValidatorsResponse[row].weight/totalWeight*100).toFixed(1) + '%',
                        online: ValidatorsResponse[row].online,
                    })
                })
                tableDataValidators.sort(function (a, b) {
                    if (a.efficiency > b.efficiency) {
                      return -1;
                    }
                    if (a.efficiency < b.efficiency) {
                      return 1;
                    }
                    return 0;
                });
                setDataValidatorsList(tableDataValidators);
                setDataVoting(lastmsgJSON.offers?lastmsgJSON.offers:dataVoting);
                setDataComplaints(lastmsgJSON.complaints?lastmsgJSON.complaints:dataComplaints);
                setDataLastBlock(lastmsgJSON.last_block?lastmsgJSON.last_block:dataLastBlock);
                setDataBlocks(lastmsgJSON.blocks);
                setDataTPS(lastmsgJSON.tpsAvg?lastmsgJSON.tpsAvg:dataTPS);
            }
            catch (error) {
                console.error(error);
            }
        }
    }, [lastMessage, setMessageHistory]);

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <h4 className="page-title" >Status of TON Services</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                {serversStatusResponse ? serversStatusResponse.map((server, index) => <Col key={`status_${index}`} lg={4} md={6}><ServerStatusList socketState={readyState} serverStatusData={server} /></Col>) : <Col lg={12}><Card className='widget-flat'><Card.Body><SkeletonTheme><Skeleton count={5} /></SkeletonTheme></Card.Body></Card></Col>}
            </Row>            
            <Row style={{marginTop:"-24px"}}>
                <Col>
                    <div className="page-title-box">
                        <h4 className="page-title" >Network activities</h4>
                    </div>
                </Col>
            </Row>
            <Row>                
                <Col lg={4}>
                    <ElectionsStatus socketState={readyState} data={dataElections} />
                </Col>
                <Col lg={4}>
                    <ConfigVotings socketState={readyState} data={dataVoting} />
                </Col>
                <Col lg={4}>
                    <SlashingData socketState={readyState} data={dataComplaints} />
                </Col>
            </Row>
            <Row style={{marginTop:"-24px"}}>
                <Col>
                    <div className="page-title-box">
                        <h4 className="page-title" >Blocks</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <LastBlock socketState={readyState} data={dataLastBlock} />
                </Col>
                <Col lg={4}>
                    <TPSinfo socketState={readyState} data={dataTPS} />
                </Col>
            </Row>
            <Row style={{marginTop:"-24px"}}>
                <Col>
                    <div className="page-title-box">
                        <h4 className="page-title" >Liteservers</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {dataLT&&(readyState===ReadyState.OPEN) ? 
                        <LiteServersPerformance socketState={readyState} data={dataLT} /> 
                        :<Card> <Card.Body> <Skeleton count={5} height={15} /> </Card.Body> </Card> }
                </Col>
            </Row>
            <Row>
                <Validators socketState={readyState} data={dataValidators} />
                <Col lg={12}>
                    {(dataValidatorsList && readyState===ReadyState.OPEN) ? <ValidatorsStatusList socketState={readyState} data={dataValidatorsList} />
                    :<Card> <Card.Body> <Skeleton count={5} height={15} /> </Card.Body> </Card> }
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <GiverInfo/>
                </Col>
            </Row>
        </>
    )
}
export default StatusPage;
