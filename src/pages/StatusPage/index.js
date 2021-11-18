import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Row, Col, Card, Collapse, Button, Modal, Alert } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import ElectionsStatus from './ElectionsStatus.js';
import ConfigVotings from './ConfigVotings.js';
import SlashingData from './SlashingData.js';
import LiteServersPerformance from './LiteServersPerformance.js';
import ServerStatusList from "./ServerStatusList.js";
import BlockchainStats from '../status/components/BlockchainStats.js';
import BlockList from '../status/components/BlockList.js';
import BridgeContainer from '../status/components/BridgeContainer.js';
import ListContainer from '../status/components/ListContainer.js';
import LiteserverStatus from '../status/components/LiteserverStatus.js';
import ShardList from '../status/components/ShardList.js';
import TransactionList from '../status/components/TransactionList.js';
import Validators from './Validators.js';
import BlockRate from './BlockRate.js';


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
    const [serversStatusResponse,setServersStatusResponse] = useState([false,false,false,false,false,false]);//False using for preloaders when socket is down and data is not exist
    const [dataLT,setDataLT] = useState();
    const [dataElections,setDataElections] = useState();
    const [dataBridges,setDataBridges] = useState();
    const [dataValidators,setDataValidators] = useState();
    const [dataVoting,setDataVoting] = useState();    
    const [dataSlashing,setDataSlashing] = useState();
    const [dataBlocks,setDataBlocks] = useState();

    useEffect(() => {},[readyState])

    useEffect(() => {
        if (lastMessage) {
            console.log( JSON.parse(lastMessage.data));
            try{
                var lastmsgJSON = JSON.parse(lastMessage.data);
                setMessageHistory(prev => prev.concat(lastMessage));
                setServersStatusResponse(lastmsgJSON.services);
                var liteservers = lastmsgJSON.liteservers.map((server) => {return {ip:server.ip,port:server.port,time:server.time ? server.time.toFixed(0)+"ms" : "offline"}});
                setDataLT(liteservers);
                setDataElections(lastmsgJSON.elections);
                setDataBridges(lastmsgJSON.bridge);
                setDataValidators(lastmsgJSON.validators);
                setDataVoting(lastmsgJSON.offers);
                setDataSlashing(lastmsgJSON.complaints);
                setDataBlocks(lastmsgJSON.blocks_rate);
            }
            catch (error) {
                console.error(error);
            }
        }
    }, [lastMessage, setMessageHistory]);

    return (
        <>
            <Row>
                {serversStatusResponse ? serversStatusResponse.map((server, index) => <Col key={`status_${index}`} lg={4}><ServerStatusList socketState={readyState} serverStatusData={server} /></Col>) : null}
            </Row>
            <Row>
                <Col lg={4}>
                    <ElectionsStatus socketState={readyState} data={dataElections} />
                </Col>
                <Col lg={4}>
                    <ConfigVotings socketState={readyState} data={dataVoting} />
                </Col>
                <Col lg={4}>
                    <SlashingData socketState={readyState} data={dataSlashing} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <LiteServersPerformance socketState={readyState} data={dataLT} />
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Validators socketState={readyState} data={dataValidators} />
                </Col>
                <Col lg={4}>
                    <BridgeContainer socketState={readyState} data={dataBridges} />
                </Col>
                <Col lg={4}>
                    <BlockRate socketState={readyState} data={dataBlocks} />
                </Col>
            </Row>
        </>
    )
}
export default StatusPage;
