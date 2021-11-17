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
import BridgeStatus from '../status/components/BridgeStatus.js';
import ListContainer from '../status/components/ListContainer.js';
import LiteserverStatus from '../status/components/LiteserverStatus.js';
import ShardList from '../status/components/ShardList.js';
import TransactionList from '../status/components/TransactionList.js';


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
    //FAKE DATA
    const [dataVoting,setDataVoting] = useState();
    const [dataSlashing,setDataSlashing] = useState();

    //FAKE RESPONSE
    useEffect(async () => {
        setDataVoting({count:79});
        setDataSlashing({count:11});
    }, []);

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
            }
            catch (error) {
                console.error(error);
            }
        }
    }, [lastMessage, setMessageHistory, readyState]);

    const pageStyle = {
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        marginBottom: '20px',
    }
    const columnContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

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
            <div style={pageStyle}>
                <div style={columnContainerStyle}>
                    <LiteserverStatus responseTime={"NA"} syncState="Synced" />
                    <BlockchainStats tps={228} transferedAmount={'NA'} validatorCount={'NA'} />
                </div>
                <div style={columnContainerStyle}>
                    <ListContainer>
                        <BlockList blocks={blocks}/>
                        <TransactionList transactions={transactions}/>
                    </ListContainer>
                    <BridgeContainer>
                        {!dataBridges ?
                            <SkeletonTheme>
                                <Skeleton count={4} />
                            </SkeletonTheme>
                            :
                            <>
                                <BridgeStatus status={dataBridges.eth} title={"TON/ETH"} />
                                <BridgeStatus status={dataBridges.bsc} title={"TON/BSC"} />
                            </>
                        }
                    </BridgeContainer>
                </div>

            </div>
        </>
    )
}
export default StatusPage;
